import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<string> {
        const prod = await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });

        return prod.id;
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products.map(product => {
            const prod = new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            });

            return prod;
        });
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({ where: { id } });

        if (!product) {
            throw new Error("Product Not Found");
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });
    }

}