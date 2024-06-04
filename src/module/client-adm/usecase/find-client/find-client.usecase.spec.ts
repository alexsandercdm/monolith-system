import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usacase";

const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "x@x.com",
    document: "000",
    address: new Address({
        street: "Street 1",
        city: "City 1",
        complement: "Complement 1",
        number: "000",
        state: "State 1",
        zipCode: "000",
    }),
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};

describe("Find client usecase unit test", () => {
    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUsecase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe("Client 1");
        expect(result.email).toBe("x@x.com");
        expect(result.document).toBe("000");
        expect(result.street).toBe("Street 1");
        expect(result.city).toBe("City 1");
        expect(result.complement).toBe("Complement 1");
        expect(result.number).toBe("000");
        expect(result.state).toBe("State 1");
        expect(result.zipCode).toBe("000");

    });
});