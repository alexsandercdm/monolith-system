import request from 'supertest';
import express, { Express } from "express";
import { routerClient } from "../../routes/client-adm.routes";

describe("e2e Controller Client-adm test", () => {
    const app: Express = express();
    app.use(express.json());
    app.use('/clients', routerClient);

    it("should create a client widh api", async () => {
        const input = {
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

        const result = await request(app).post('/clients').send(input);

        expect(result.status).toBe(200);
        expect(result.body.status).toBe("Criado com sucesso");

    });

    it("should return a client widh api", async () => {
        const id = getRandomInt(999);
        const input = {
            id: id,
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

        const result = await request(app).post('/clients').send(input);

        expect(result.status).toBe(200);
        expect(result.body.status).toBe("Criado com sucesso");

        const output = await request(app).get(`/clients/${id}`).send();

        expect(output.status).toBe(200);
        expect(output.body.id).toBeDefined();
        expect(output.body.name).toBe("Name 1");
        expect(output.body.document).toBe("000");
        expect(output.body.email).toBe("email@x.com");
        expect(output.body.address.street).toBe("Street 1");
        expect(output.body.address.number).toBe("Number 1");
        expect(output.body.address.complement).toBe("Complement 1");
        expect(output.body.address.city).toBe("City 1");
        expect(output.body.address.state).toBe("State 1");
        expect(output.body.address.zipCode).toBe("000");
        expect(output.body.createdAt).toBeDefined();
        expect(output.body.updatedAt).toBeDefined();
    });

    it("should not return a client with api", async () => {
        
        const output = await request(app).get("/clients/1000").send();

        expect(output.status).toBe(500);
        expect(output.body.status).toBe("Cliente não encontrado");
        
    });
});

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}