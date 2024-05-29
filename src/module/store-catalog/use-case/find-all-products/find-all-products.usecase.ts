import UserCaseInterface from "../../../@shared/domain/use-case/use-case-interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase  implements UserCaseInterface {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }
    
    async execute(input: {}): Promise<FindAllProductsDto> {
        const products = await this._productRepository.findAll();
        return ProductsToList.toList(products);
    }

}

class ProductsToList {
    static toList(product: Product[]): FindAllProductsDto {
        const prods = {
            products: product.map((prod) => ({
                id: prod.id.id,
                name: prod.name,
                description: prod.description,
                salesPrice: prod.salesPrice,
            })),
        }
        return prods
    }
}