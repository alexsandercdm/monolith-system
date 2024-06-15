import UserCaseInterface from "../../../@shared/domain/use-case/use-case-interface";
import ProductGateway from "../../gateway/product.gateway";
import { UpdateStockProductInputDto, UpdateStockProductOutputDto } from "./update-stock.dto";

export default class UpdateStockUseCase implements UserCaseInterface {

    constructor(private repository: ProductGateway) { }

    async execute(input: UpdateStockProductInputDto): Promise<UpdateStockProductOutputDto> {
        const result = await this.repository.updateStock(input.productId, input.stock);

        return { status: result }
    }

}