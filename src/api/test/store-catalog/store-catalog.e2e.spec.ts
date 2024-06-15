import request from 'supertest';
import express, { Express } from "express";
import { routerStoreCatalog } from '../../routes/store-catalog.route';

describe("Store Catalog test", () => {
    const app: Express = express();
    app.use(express.json());
    app.use('/catalog', routerStoreCatalog);

    it("Should created store catalog", async () => {
        const id1 = getRandomInt(999);
        const input = {
            id: id1,
            name: "Product",
            description: "Description",
            salesPrice: 120,
        };

        const result = await request(app).post('/catalog').send(input);

        expect(result.status).toBe(200);
        expect(result.body).toStrictEqual({id: id1});
    });
});

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}