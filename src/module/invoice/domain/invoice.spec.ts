import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "./invoice";
import InvoiceItems from "./invoice.item";

describe("Test unit invoice", () => {

    it("should create a item invoice", () => {
        const item = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 10,
        });

        expect(item).toBeDefined();
        expect(item.id.id).toBe("1");
        expect(item.name).toBe("Item 1");
        expect(item.price).toBe(10);
    });

    it("should not create a item invoice with price greather zero", () => {
        expect(() => {
            new InvoiceItems({
                id: new Id("1"),
                name: "Item 1",
                price: -10,
            });
        }).toThrow("Price must be greather than 0");

    });

    it("Should create a invoice", () => {
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
            items: [item1, item2],
        });

        expect(invoice).toBeDefined();
        expect(invoice.id.id).toBe("1");
        expect(invoice.name).toBe("Invoice 1");
        expect(invoice.document).toBe("Document 1");
        expect(invoice.address.street).toBe("Street 1");
        expect(invoice.address.number).toBe("Number 1");
        expect(invoice.address.complement).toBe("Complement 1");
        expect(invoice.address.city).toBe("City 1");
        expect(invoice.address.state).toBe("State 1");
        expect(invoice.address.zipCode).toBe("ZipCode 1");

        expect(invoice.items.length).toBe(2);
        expect(invoice.items[0].id.id).toBe("1");
        expect(invoice.items[0].name).toBe("Item 1");
        expect(invoice.items[0].price).toBe(10);

        expect(invoice.items[1].id.id).toBe("2");
        expect(invoice.items[1].name).toBe("Item 2");
        expect(invoice.items[1].price).toBe(20);
    });


    it("Should sum total items of a invoice", () => {
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

        expect(invoice).toBeDefined();
        expect(invoice.id.id).toBe("1");
        expect(invoice.name).toBe("Invoice 1");
        expect(invoice.document).toBe("Document 1");
        expect(invoice.address.street).toBe("Street 1");
        expect(invoice.address.number).toBe("Number 1");
        expect(invoice.address.complement).toBe("Complement 1");
        expect(invoice.address.city).toBe("City 1");
        expect(invoice.address.state).toBe("State 1");
        expect(invoice.address.zipCode).toBe("ZipCode 1");

        expect(invoice.items.length).toBe(3);
        expect(invoice.items[0].id.id).toBe("1");
        expect(invoice.items[0].name).toBe("Item 1");
        expect(invoice.items[0].price).toBe(10);

        expect(invoice.items[1].id.id).toBe("2");
        expect(invoice.items[1].name).toBe("Item 2");
        expect(invoice.items[1].price).toBe(20);

        expect(invoice.items[2].id.id).toBe("3");
        expect(invoice.items[2].name).toBe("Item 3");
        expect(invoice.items[2].price).toBe(30);

        expect(invoice.total).toBe(60);
    });

});