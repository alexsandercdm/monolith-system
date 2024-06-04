import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client-adm.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import { AddClientFacadeInputDto } from "./client-adm.facade.interface";

describe("Client Adm Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client-adm facade", async () => {

        const facade = ClientAdmFacadeFactory.create();

        const client = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            document: "000",
            street: "Street 1",
            city: "City 1",
            complement: "Complement 1",
            number: "000",
            state: "State 1",
            zipCode: "000",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await facade.addClient(client);

        const result = await ClientModel.findOne({ where: { id: client.id } });

        expect(result).toBeDefined();
        expect(result.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.document).toBe(client.document);
        expect(result.street).toBe("Street 1");
        expect(result.city).toBe("City 1");
        expect(result.complement).toBe("Complement 1");
        expect(result.number).toBe("000");
        expect(result.state).toBe("State 1");
        expect(result.zipCode).toBe("000");


    });

    it("should find a client-adm facade", async () => {

        const facade = ClientAdmFacadeFactory.create();

        const client: AddClientFacadeInputDto = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            street: "Street 1",
            city: "City 1",
            document: "000",
            complement: "Complement 1",
            number: "000",
            state: "State 1",
            zipCode: "000",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await facade.addClient(client);

        const result = await facade.findClient({ clientId: client.id });

        expect(result).toBeDefined();
        expect(result.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.document).toBe(client.document);
        expect(result.street).toBe(client.street);
        expect(result.city).toBe(client.city);
        expect(result.complement).toBe(client.complement);
        expect(result.state).toBe(client.state);
        expect(result.zipCode).toBe(client.zipCode);
    });
});