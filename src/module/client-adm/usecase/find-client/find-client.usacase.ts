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
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}