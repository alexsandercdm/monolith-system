import { CreatedAt, Sequelize } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import CheckoutRepository from "./checkout.repository";
import Order from "../domain/order.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Product from "../domain/product.entity";
import ItemOrderModel from "./item-order.model";
import ClientModel from "../../client-adm/repository/client-adm.model";
import ProductModel from "../../store-catalog/repository/product.model";


describe("Checkout repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel ,ClientModel, OrderModel, ItemOrderModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        sequelize.close();
    });

    it("should not create a order becaus client not found", async () => {
        const repository = new CheckoutRepository();

        const order = new Order({
            id: new Id("1"),
            client: new Client({
                id: new Id("1"),
                name: "",
                email: "",
                document: "",
                address: new Address({
                    street: "",
                    number: "",
                    complement: "",
                    city: "",
                    state: "",
                    zipCode: "",
                }),
            }) ,
            status: "pending",
            products: [],
        });

        await expect(repository.addOrder(order)).rejects.toThrow("Client Not Found");
        
    });

    it("should create a order", async () => {
        const repository = new CheckoutRepository();

        const client = {
            id: "1c",
            name: "Client 0",
            document: "0000",
            email: "client@user.com",
            street: "some address",
            number: "1",
            complement: "1",
            city: "Some city",
            state: "some State",
            zipCode: "000",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await ClientModel.create(client);

        
        const products = [
            {
                id: "1",
                name: "Product 1",
                description: "some description",
                salesPrice: 40,

            },
            {
                id: "2",
                name: "Product 2",
                description: "some description",
                salesPrice: 30,
            }
        ]

        for (const prod of products) {
            await ProductModel.create(prod);
        }

        const order = new Order({
            id: new Id("1"),
            client: new Client({
                id: new Id(client.id),
                name: client.name,
                email: client.email,
                document: client.document,
                address: new Address({
                    street: client.street,
                    number: client.number,
                    complement: client.complement,
                    city: client.city,
                    state: client.state,
                    zipCode: client.zipCode,
                }),
            }) ,
            status: "approved",
            products: products.map((p) => {
                return new Product({
                    id: new Id(p.id),
                    name: p.name,
                    description: p.description,
                    salesPrice: p.salesPrice,
                })
            }),
        });

        await repository.addOrder(order);

        const result = await OrderModel.findOne({where: {id: order.id.id}});
        const itens = await ItemOrderModel.findAll({where: {orderId: order.id.id}});

        expect(result.id).toBe("1");
        expect(result.client).toBe("1c");

        expect(itens[0].id).toBe("1");
        expect(itens[0].name).toBe("Product 1");
        expect(itens[0].description).toBe("some description");
        expect(itens[0].salesPrice).toBe(40);

        expect(itens[1].id).toBe("2");
        expect(itens[1].name).toBe("Product 2");
        expect(itens[1].description).toBe("some description");
        expect(itens[1].salesPrice).toBe(30);
        
    });

    it("should not create a order because product not found", async () => {
        const repository = new CheckoutRepository();

        const client = {
            id: "1c",
            name: "Client 0",
            document: "0000",
            email: "client@user.com",
            street: "some address",
            number: "1",
            complement: "1",
            city: "Some city",
            state: "some State",
            zipCode: "000",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await ClientModel.create(client);

        
        const products = [
            {
                id: "1",
                name: "Product 1",
                description: "some description",
                salesPrice: 40,

            },
            {
                id: "2",
                name: "Product 2",
                description: "some description",
                salesPrice: 30,
            }
        ]

        const order = new Order({
            id: new Id("1"),
            client: new Client({
                id: new Id(client.id),
                name: client.name,
                email: client.email,
                document: client.document,
                address: new Address({
                    street: client.street,
                    number: client.number,
                    complement: client.complement,
                    city: client.city,
                    state: client.state,
                    zipCode: client.zipCode,
                }),
            }) ,
            status: "approved",
            products: products.map((p) => {
                return new Product({
                    id: new Id(p.id),
                    name: p.name,
                    description: p.description,
                    salesPrice: p.salesPrice,
                })
            }),
        });

        await expect(repository.addOrder(order)).rejects.toThrow("Product Not Found");
        
    });
});