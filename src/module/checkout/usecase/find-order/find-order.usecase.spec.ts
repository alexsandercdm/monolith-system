import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import { FindOrderInputDto, FindOrderOutputDto } from "./find-order.dto";
import FindOrderUseCase from "./find-order.usecase";

const order = new Order({
    id: new Id("1o"),
    client: new Client({
        id: new Id("1c"),
        name: "Client name",
        email: "x@x.com",
        document: "000",
        address: new Address({
            street: "Street 1",
            number: "Number 1",
            complement: "Complement",
            city: "City 1",
            state: "State 1",
            zipCode: "000",
        }),
    }),
    status: "approved",
    invoiceId: "1i",
    products: [new Product({
        id: new Id("1p"),
        name: "Product 1",
        description: "Description",
        salesPrice: 20,
    }), new Product({
        id: new Id("2p"),
        name: "Product 2",
        description: "Description",
        salesPrice: 30,
    })],
});


const MockRepository = () => {
    return {
        findOrder: jest.fn().mockReturnValue(Promise.resolve(order)),
        addOrder: jest.fn(),
    }
}

describe("FindOrder usecase unit test", () => {
    it("should find a order", async () => {

        const repository = MockRepository();

        const useCase = new FindOrderUseCase(repository);

        const input: FindOrderInputDto = {
            orderId: "1c"
        }

        const output = await useCase.execute(input);

        expect(output.id).toBe("1o");
        expect(output.invoiceId).toBe("1i");
        expect(output.status).toBe("approved");
        expect(output.total).toBe(50);
        expect(output.products[0].productId).toBe("1p");
        expect(output.products[1].productId).toBe("2p");
    });
});