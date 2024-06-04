import ClientGateway from "../../gateway/client-gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usacase.dto";

export default class FindClientUsecase {
    private _repository: ClientGateway;

    constructor(repositoryClient: ClientGateway) {
        this._repository = repositoryClient;
    };

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this._repository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            city: client.address.city,
            complement: client.address.complement,
            number: client.address.number,
            state: client.address.state,
            zipCode: client.address.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}