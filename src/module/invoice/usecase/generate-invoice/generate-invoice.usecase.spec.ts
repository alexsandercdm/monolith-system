import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice.item";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const item1 = new InvoiceItems({
    id: new Id("1"),
    name: "Item 1",
    price: 10,
});

const item2 = new InvoiceItems({
    id: new Id("2"),
    name: "Item 2",
    price: 20,
});


const invoice = new Invoice({
    name: "Invoice 1",
    document: "Document 1",
    address: new Address({
        street: "Street 1",
        number: "Number 1",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "ZipCode 1",
    }),
    items: [item1, item2],
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
};


describe("Generate Invoice Unit test", () => {
    it("should generate invoice", async () => {
        const repository = MockRepository();
        const useCase = new GenerateInvoiceUseCase(repository);

        const input = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "Number 1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
            items: [{
                id: "1",
                name: "Item 1",
                price: 10,
            }, {
                id: "2",
                name: "Item 2",
                price: 20,
            }],
        };

        const result = await useCase.execute(input);

        expect(repository.create).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");
        expect(result.street).toBe("Street 1");
        expect(result.number).toBe("Number 1");
        expect(result.complement).toBe("Complement 1");
        expect(result.city).toBe("City 1");
        expect(result.state).toBe("State 1");
        expect(result.zipCode).toBe("ZipCode 1");

        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);

        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);
    });
});