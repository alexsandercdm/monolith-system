import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client-adm.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client-adm.repository";

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
            address: "Address 1",
        }

        const client = new Client(clientProps);

        const clientRepository = new ClientRepository();

        await clientRepository.add(client);
        const result = await ClientModel.findOne({ where: { id: client.id.id } });

        expect(result.id).toBeDefined();
        expect(result.name).toBe("Client 1");
        expect(result.email).toBe("x@x.com");
        expect(result.address).toBe("Address 1");


    });

    it("should find a client", async () => {
        const clientProps = {
            id: new Id("1"),
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        }

        const client = new Client(clientProps);

        const clientRepository = new ClientRepository();

        await clientRepository.add(client);
        const result = await clientRepository.find(client.id.id);

        expect(result.id).toBeDefined();
        expect(result.name).toBe("Client 1");
        expect(result.email).toBe("x@x.com");
        expect(result.address).toBe("Address 1");
    });
});