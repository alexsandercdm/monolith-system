import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItensModel } from "./invoice-items.model";
import InvoiceRepository from "./invoice.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceItems from "../domain/invoice.item";
import Invoice from "../domain/invoice";

describe("Invoice repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ InvoiceItensModel, InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("shound Find a invoice", async () => {
        const repository = new InvoiceRepository();

        const invoice = await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "Number 1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const item1 = await InvoiceItensModel.create({
            id: "1",
            invoiceId: invoice.id,
            name: "Item 1",
            price: 10,
        });

        const item2 = await InvoiceItensModel.create({
            id: "2",
            invoiceId: invoice.id,
            name: "Item 2",
            price: 20,
        });

        const result = await repository.find("1");

        expect(result).toBeDefined();
        expect(result.id.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.number).toBe("Number 1");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.state).toBe("State 1");
        expect(result.address.zipCode).toBe("ZipCode 1");
        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);
        expect(result.items[1].id.id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);
    });

    it("shound create a invoice", async () => {
        const repository = new InvoiceRepository();

        const result = await repository.create(new Invoice({
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
            items: [
                new InvoiceItems({
                    id: new Id("1"),
                    name: "Item 1",
                    price: 10,
                }),
                new InvoiceItems({
                    id: new Id("2"),
                    name: "Item 2",
                    price: 20,
                }),
            ],
        }));


        expect(result).toBeDefined();
        expect(result.id).toBeDefined()
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.number).toBe("Number 1");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.state).toBe("State 1");
        expect(result.address.zipCode).toBe("ZipCode 1");
        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);
        expect(result.items[1].id.id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);
    });
});