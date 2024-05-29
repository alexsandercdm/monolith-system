import UserCaseInterface from "../../@shared/domain/use-case/use-case-interface";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findUseCase: UserCaseInterface;
    findAllUseCase: UserCaseInterface;
};

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: UserCaseInterface;
    private _findAllUseCase: UserCaseInterface;

    constructor(props: UseCaseProps) {
        this._findAllUseCase = props.findAllUseCase;
        this._findUseCase = props.findUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute(id);
    }
    
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute({});
    }

}