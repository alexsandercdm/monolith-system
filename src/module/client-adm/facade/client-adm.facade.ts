import UserCaseInterface from "../../@shared/domain/use-case/use-case-interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

type ClientAdmFacadeUseCasesProps = {
    addUseCase: UserCaseInterface;
    findUseCase: UserCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addUseCase: UserCaseInterface;
    private _findUseCase: UserCaseInterface;

    constructor(props: ClientAdmFacadeUseCasesProps) {
        this._addUseCase = props.addUseCase;
        this._findUseCase = props.findUseCase;
    }

    async addClient(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUseCase.execute({
            id: input.id,
            name: input.name,
            email: input.email,
            document: input.document,
            street: input.street,
            city: input.city,
            complement: input.complement,
            number: input.number,
            state: input.state,
            zipCode: input.zipCode,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });
    }

    async findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUseCase.execute({ id: input.clientId });
    }

}