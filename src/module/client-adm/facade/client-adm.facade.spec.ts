import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client-adm.model";
import ClientRepository from "../repository/client-adm.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUsecase from "../usecase/find-client/find-client.usacase";
import ClientAdmFacadeFactory from "../factory/facade.factory";

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
        // const clientRepository = new ClientRepository();
        // const addUsecase = new AddClientUsecase(clientRepository);
        // const findUseCase = new FindClientUsecase(clientRepository);

        // const usecaseProps = {
        //     addUseCase: addUsecase,
        //     findUseCase: findUseCase,
        // }

        const facade = ClientAdmFacadeFactory.create();

        const client = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await facade.addClient(client);

        const result = await ClientModel.findOne({ where: { id: client.id } });

        expect(result).toBeDefined();
        expect(result.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);


    });

    it("should find a client-adm facade", async () => {
        // const clientRepository = new ClientRepository();
        // const addUsecase = new AddClientUsecase(clientRepository);
        // const findUseCase = new FindClientUsecase(clientRepository);

        // const usecaseProps = {
        //     addUseCase: addUsecase,
        //     findUseCase: findUseCase,
        // }

        const facade = ClientAdmFacadeFactory.create();

        const client = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await facade.addClient(client);

        const result = await facade.findClient({ clientId: client.id });

        expect(result).toBeDefined();
        expect(result.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
    });
});