import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice.item";
import FindInvoiceUseCase from "./find-invoice.usecase";

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

const item3 = new InvoiceItems({
    id: new Id("3"),
    name: "Item 3",
    price: 30,
});

const invoice = new Invoice({
    id: new Id("1"),
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
    items: [item1, item2, item3],
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        create: jest.fn(),
    };
}


describe("Find Invoice Usecase unit test", () => {
    it("should find a invoice", async () => { 
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(result).toBeDefined();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.number).toBe("Number 1");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.state).toBe("State 1");
        expect(result.address.zipCode).toBe("ZipCode 1");

        expect(result.items.length).toBe(3);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);

        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);

        expect(result.items[2].id).toBe("3");
        expect(result.items[2].name).toBe("Item 3");
        expect(result.items[2].price).toBe(30);

    });

    it("should find a invoice with total sum of items", async () => { 
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(result).toBeDefined();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.number).toBe("Number 1");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.state).toBe("State 1");
        expect(result.address.zipCode).toBe("ZipCode 1");

        expect(result.items.length).toBe(3);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);

        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);

        expect(result.items[2].id).toBe("3");
        expect(result.items[2].name).toBe("Item 3");
        expect(result.items[2].price).toBe(30);

        expect(result.total).toBe(60);

    });
});