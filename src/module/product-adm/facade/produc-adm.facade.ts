import UserCaseInterface from "../../@shared/domain/use-case/use-case-interface";
import ProductAdmFacadeInterface, { AddProducFacadeInputDto, CheckStockFacedeInputDto, CheckStockFacedeOutputDto, UpdateStockProductFacadeInputDto, UpdateStockProductFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UserCaseInterface,
    stockUsecase: UserCaseInterface,
    updateStockUseCase: UserCaseInterface,
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {


    private _addUseCase: UserCaseInterface;
    private _checkStockUsecase: UserCaseInterface;
    private _updateStockUseCase: UserCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._addUseCase = usecasesProps.addUseCase;
        this._checkStockUsecase = usecasesProps.stockUsecase;
        this._updateStockUseCase = usecasesProps.updateStockUseCase;
    }
    updateStock(input: UpdateStockProductFacadeInputDto): Promise<UpdateStockProductFacadeOutputDto> {
        return this._updateStockUseCase.execute(input);
    }

    addProduct(input: AddProducFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacedeInputDto): Promise<CheckStockFacedeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }

}