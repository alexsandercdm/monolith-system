import AddProductStoreCatalogUseCase from "./add-product.usecase";

const product = {
    id: "1p",
    name: "Product 1",
    description: "Description 1",
    salesPrice: 10,
}

const MockRepository = () => {
    return {
        add: jest.fn().mockReturnValue(Promise.resolve(product.id)),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("AddProduct StoreCatalog unit test", () => {
    it("Should create a product and return product ID", async () => {
        const repository = MockRepository();

        const useCase = new AddProductStoreCatalogUseCase(repository);

        const result  = await useCase.execute(product);

        expect(result.id).toBe("1p");
    });
});