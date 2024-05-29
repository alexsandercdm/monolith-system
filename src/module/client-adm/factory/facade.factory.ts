import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client-adm.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usacase";

export default class ClientAdmFacadeFactory {
    static create() : ClientAdmFacade {
        const clientRepository = new ClientRepository();
        const addUsecase = new AddClientUsecase(clientRepository);
        const findUseCase = new FindClientUsecase(clientRepository);

        const usecaseProps = {
            addUseCase: addUsecase,
            findUseCase: findUseCase,
        }

        const facade = new ClientAdmFacade(usecaseProps);

        return facade;
    }
}