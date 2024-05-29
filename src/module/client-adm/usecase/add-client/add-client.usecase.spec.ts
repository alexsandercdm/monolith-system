import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Add cliente Usecase unit test", () => {
    it("Should add a client", async () => {
        const productRepository = MockRepository();
        const usecase = new AddClientUsecase(productRepository);

        const input = {
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        };

        const result = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe("Client 1");
        expect(result.email).toBe("x@x.com");
        expect(result.address).toBe("Address 1");
    });
});