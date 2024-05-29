import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 19,
    stock: 10,
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe("Check stock usecase", () => {

    it("Return get stock a product", async () => {
        const productRepository = MockRepository();
        const stockUseCase = new CheckStockUseCase(productRepository);

        const input = {
            productId: "1",
        }

        const output = await stockUseCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.productId).toBe("1");
        expect(output.stock).toBe(10);

    });
    
});