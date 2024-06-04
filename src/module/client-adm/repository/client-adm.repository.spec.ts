import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client-adm.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client-adm.repository";
import Address from "../../@shared/domain/value-object/address.value-object";

describe("Client repository test", () => {

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



    it("should create a client", async () => {
        const clientProps = {
            id: new Id("1"),
            name: "Client 1",
            email: "x@x.com",
            document: "000",
            address: new Address({
                street: "Street 1",
                city: "City 1",
                complement: "Complement 1",
                number: "000",
                state: "State 1",
                zipCode: "000"
            }),
        }

        const client = new Client(clientProps);

        const clientRepository = new ClientRepository();

        await clientRepository.add(client);
        const result = await ClientModel.findOne({ where: { id: client.id.id } });

        expect(result.id).toBeDefined();
        expect(result.name).toBe("Client 1");
        expect(result.email).toBe("x@x.com");
        expect(result.document).toBe("000");
        expect(result.street).toBe("Street 1");
        expect(result.complement).toBe("Complement 1");
        expect(result.number).toBe("000");
        expect(result.state).toBe("State 1");
        expect(result.zipCode).toBe("000");

    });

    it("should find a client", async () => {
        const clientProps = {
            id: new Id("1"),
            name: "Client 1",
            email: "x@x.com",
            document: "000",
            address: new Address({
                street: "Street 1",
                city: "City 1",
                complement: "Complement 1",
                number: "000",
                state: "State 1",
                zipCode: "000"
            }),  
        }

        const client = new Client(clientProps);

        const clientRepository = new ClientRepository();

        await clientRepository.add(client);
        const result = await clientRepository.find(client.id.id);

        expect(result.id).toBeDefined();
        expect(result.name).toBe("Client 1");
        expect(result.email).toBe("x@x.com");
        expect(result.document).toBe("000");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.number).toBe("000");
        expect(result.address.state).toBe("State 1");
        expect(result.address.zipCode).toBe("000");
    });
});