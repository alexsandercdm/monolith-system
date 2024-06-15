import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import ProductModel from "../module/store-catalog/repository/product.model";
import { ProductModel as ProductAdmModel } from "../module/product-adm/repository/product.model"
import { migrator } from "../infrastructure/migrations/config-migrations/migrator";
import { productRegistrationRoute, productRoute } from "./routeProducts";
import request from 'supertest';


describe("Products test", () => {
    const app: Express = express();
    app.use(express.json());
    app.use("/product-adm", productRegistrationRoute);
    app.use('/product', productRoute);

    let sequelize: Sequelize;

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([ProductModel, ProductAdmModel]);
        migration = migrator(sequelize);
        await migration.up();
    });

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }

        migration = migrator(sequelize);

        await migration.down();
        await sequelize.close();
    });

    it("should create product registration", async () => {
        const response = await request(app).post("/product-adm").send({
            id: "1",
            name: "DDD",
            description: "Domain Driven Design",
            stock: 1,
            purchasePrice: 25.90
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("DDD");
        expect(response.body.description).toBe("Domain Driven Design")
        expect(response.body.purchasePrice).toBe(25.90)

    });

    it("should create product", async () => {
        const response = await request(app).post("/product").send({
            id: "2",
            name: "DDD",
            description: "Domain Driven Design",
            salesPrive: 30.90
        });

        expect(response.status).toBe(200);
        expect(response.body.id).toBe("2");
        

    });

    it("should create product whe auto id", async () => {
        const response = await request(app).post("/product").send({
            name: "DDD",
            description: "Domain Driven Design",
            salesPrive: 30.90
        });

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined()
        

    });

});