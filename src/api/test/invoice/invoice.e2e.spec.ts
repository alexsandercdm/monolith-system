import request from 'supertest';
import express, { Express } from "express";
import { routerCheckout } from '../../routes/checkout.router';
import { routerClient } from '../../routes/client-adm.routes';
import { routerStoreCatalog } from '../../routes/store-catalog.route';
import { routerInvoice } from '../../routes/invoice.route';

describe("Invoice e2e test", () => {
    const app: Express = express();
    app.use(express.json());
    app.use('/checkout', routerCheckout);
    app.use('/clients', routerClient);
    app.use('/catalog', routerStoreCatalog);
    app.use('/invoice', routerInvoice);

    it("Should get invoice with api", async () => {
        let idC = getRandomInt(999);
        const inputClient = {
            id: idC,
            name: "Name 1",
            email: "email@x.com",
            document: "000",
            street: "Street 1",
            city: "City 1",
            complement: "Complement 1",
            number: "Number 1",
            state: "State 1",
            zipCode: "000",
        };

        const client = await request(app).post('/clients').send(inputClient);

        expect(client.status).toBe(200);
        expect(client.body.status).toBe("Criado com sucesso");

        let id1 = `${getRandomInt(999)}`;
        let id2 = `${getRandomInt(999)}`;
        const prod1 = {
            id: id1,
            name: "Product 2",
            description: "Description 2",
            salesPrice: 60.0,
            stock: 3,
        };

        const prod2 = {
            id: id2,
            name: "Product 2",
            description: "Description 2",
            salesPrice: 60.90,
            stock: 3,
        };

        const product1 = await request(app).post('/catalog').send(prod1);
        const product2 = await request(app).post('/catalog').send(prod2);

        expect(product1.status).toBe(200);
        expect(product1.body).toStrictEqual({ id: id1 });

        expect(product2.status).toBe(200);
        expect(product2.body).toStrictEqual({ id: id2 });

        const result = await request(app).post("/checkout").send({
            clientId: idC,
            products: [{ productId: id1 }, { productId: id2 }],
        });

        expect(result.status).toBe(200);
        expect(result.body.id).toBeDefined();
        expect(result.body.invoiceId).toBeDefined();
        expect(result.body.status).toBe("approved");
        expect(result.body.total).toBe(120.90);
        expect(result.body.products.length).toBe(2);
        expect(result.body.products[0].productId).toBe(id1);
        expect(result.body.products[1].productId).toBe(id2);

        const invoice = await request(app).post(`/invoice/${result.body.invoiceId}`).send();

    });
});

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}