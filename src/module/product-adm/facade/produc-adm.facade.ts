import UserCaseInterface from "../../@shared/domain/use-case/use-case-interface";
import ProductAdmFacadeInterface, { AddProducFacadeInputDto, CheckStockFacedeInputDto, CheckStockFacedeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UserCaseInterface,
    stockUsecase: UserCaseInterface,
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {


    private _addUseCase: UserCaseInterface;
    private _checkStockUsecase: UserCaseInterface

    constructor(usecasesProps: UseCasesProps) {
        this._addUseCase = usecasesProps.addUseCase;
        this._checkStockUsecase = usecasesProps.stockUsecase;
    }

    addProduct(input: AddProducFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacedeInputDto): Promise<CheckStockFacedeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }

}