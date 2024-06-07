import UserCaseInterface from "../../../@shared/domain/use-case/use-case-interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockProductInputDto, CheckStockProductOutputDto } from "./check-sotck.product.dto";

export default class CheckStockUseCase implements UserCaseInterface {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: CheckStockProductInputDto): Promise<CheckStockProductOutputDto> {
        const product = await this._productRepository.find(input.productId);
        if (!product) {
            throw new Error(`Product with id ${input.productId} not found`)
        }
        return {
            productId: product.id.id,
            stock: product.stock,
        }
    }

}