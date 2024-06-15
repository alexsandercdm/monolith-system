import UserCaseInterface from "../../../@shared/domain/use-case/use-case-interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductStoreCatalogUseCase implements UserCaseInterface {
    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }
    
    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const productId = await this._repository.add(new Product({
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            salesPrice: input.salesPrice,
        }));

        return {id: productId};
    }

}