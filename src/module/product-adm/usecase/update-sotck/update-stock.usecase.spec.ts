import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../../store-catalog/domain/product.entity";
import UpdateStockUseCase from "./update-stock.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        updateStock: jest.fn().mockReturnValue(Promise.resolve(true)),
        find: jest.fn(),
    }
}

describe("Update stock usecase unit test", () => {
    it("Update stock a product store catalog", async () => {
        const repository = MockRepository();
        const usecase = new UpdateStockUseCase(repository);

        const input = {
            productId: "1",
            stock: 3,
        }

        const result = await usecase.execute(input);

        expect(result.status).toBe(true);

    });
});