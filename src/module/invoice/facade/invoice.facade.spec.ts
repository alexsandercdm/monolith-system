import { Sequelize } from "sequelize-typescript";
import { InvoiceItensModel } from "../repository/invoice-items.model";
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

describe("Invoice Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceItensModel, InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a invoice with facade", async () => {
        const repository = new InvoiceRepository();
        const useCase = new FindInvoiceUseCase(repository);


        const invoiceUseCase = new InvoiceFacade({
            findUseCase: useCase,
            generateUseCase: undefined,
        });

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

        const result = await invoiceUseCase.find(invoice);

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
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);
        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);
    });

    it("Should generate a invoice with facade", async () => {
        const repository = new InvoiceRepository();
        const useCase = new GenerateInvoiceUseCase(repository);

        const invoiceUseCase = new InvoiceFacade({
            findUseCase: undefined,
            generateUseCase: useCase,
        });

        const item1 = {
            id: "1",
            name: "Item 1",
            price: 10,
        };

        const item2 = {
            id: "2",
            name: "Item 2",
            price: 20,
        };

        const invoice = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "Number 1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
            items: [item1, item2],
        };

        const result = await invoiceUseCase.generate(invoice);


        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
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