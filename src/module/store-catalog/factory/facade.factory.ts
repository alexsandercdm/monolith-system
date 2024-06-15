import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import AddProductStoreCatalogUseCase from "../use-case/add-product/add-product.usecase";
import FindAllProductsUseCase from "../use-case/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../use-case/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const productRepository = new ProductRepository();
        const findUseCase = new FindProductUsecase(productRepository);
        const findAllUseCase = new FindAllProductsUseCase(productRepository);
        const addProductUseCase = new AddProductStoreCatalogUseCase(productRepository);

        const facade = new StoreCatalogFacade({
            addUseCase: addProductUseCase,
            findUseCase: findUseCase,
            findAllUseCase: findAllUseCase,
        });

        return facade;
    }
}