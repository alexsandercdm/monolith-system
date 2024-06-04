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
            document: "000",
            street: "Street 1",
            city: "City 1",
            complement: "Complement 1",
            number: "000",
            state: "State 1",
            zipCode: "000",
        };

        const result = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe("Client 1");
        expect(result.email).toBe("x@x.com");
        expect(result.document).toBe("000");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.number).toBe("000");
        expect(result.address.state).toBe("State 1");
        expect(result.address.zipCode).toBe("000");
    });
});