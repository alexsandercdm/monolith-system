import Product from "../domain/product.entity";

export default interface ProductGateway {
    add(product: Product): Promise<void>;
    updateStock(productId: string, stock: number): Promise<boolean>;
    find(id: string): Promise<Product>;
}