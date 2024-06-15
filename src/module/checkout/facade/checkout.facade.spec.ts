import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment-facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-oder.usecase";
import ProductModel from "../../store-catalog/repository/product.model";
import { ProductModel as ProductAdmModel } from "../../product-adm/repository/product.model";
import ClientModel from "../../client-adm/repository/client-adm.model";
import { OrderModel } from "../repository/order.model";
import ItemOrderModel from "../repository/item-order.model";
import CheckoutFacade from "./checkout.facade";
import { Umzug } from "umzug";
import { migrator } from "../../../infrastructure/migrations/config-migrations/migrator";
import { InvoiceModel } from "../../invoice/repository/invoice.model";
import { InvoiceItensModel } from "../../invoice/repository/invoice-items.model";
import TransactionModel from "../../payment/repository/transaction.model";

describe("Checkout Facade unit test", () => {

    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([TransactionModel, ProductModel, ClientModel, OrderModel, ItemOrderModel, ProductAdmModel, InvoiceModel, InvoiceItensModel]);
        migration = migrator(sequelize);
        await migration.up();
        await sequelize.sync();
    });

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize);
        await migration.down();
        await sequelize.close();
    });

    it("Should add order", async () => {
        const clientFacade = ClientAdmFacadeFactory.create();
        const productAdminFacade = ProductAdmFacadeFactory.create();
        const storeFacade = StoreCatalogFacadeFactory.create();
        const repositoryCheckout = new CheckoutRepository();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();

        const useCase = new PlaceOrderUseCase(
            clientFacade,
            productAdminFacade,
            storeFacade,
            repositoryCheckout,
            invoiceFacade,
            paymentFacade,
        );

        await ClientModel.create({
            id: "1",
            name: "Client 1",
            document: "000",
            email: "x@x.com",
            street: "Street 1",
            complement: "Complement 1",
            number: "000",
            city: "City 1",
            state: "State 1",
            zipCode: "000",
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await ProductModel.create({
            id: "1",
            name: "name",
            description: "description",
            salesPrice: 50,
        },);

        await ProductModel.create({
            id: "2",
            name: "name",
            description: "description",
            salesPrice: 60,
        });

        await ProductAdmModel.update({ stock: 2 }, { where: { id: 1 } });
        await ProductAdmModel.update({ stock: 3 }, { where: { id: 2 } });

        const facade = new CheckoutFacade(useCase);

        const input = {
            clientId: "1",
            products: [{ productId: "1" }, { productId: "2" }],
        }

        const output = await facade.addPlaceOrder(input);

        expect(output.id).toBeDefined();
        expect(output.invoiceId).toBeDefined();
        expect(output.status).toBe("approved");
        expect(output.total).toBe(110);
        expect(output.products[0].productId).toBe("1");
        expect(output.products[1].productId).toBe("2");

    });
});