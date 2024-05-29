import ProductAdmFacade from "../facade/produc-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUsecase = new AddProductUseCase(productRepository);
        const checkStockUseCase = new CheckStockUseCase(productRepository);

        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUsecase,
            stockUsecase: checkStockUseCase,
        });

        return productFacade;
    }
}