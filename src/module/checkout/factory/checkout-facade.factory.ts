import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment-facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutFacadeInterface from "../facade/checkout.facade.interface";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-oder.usecase";

export default class CheckoutFacadeFactory {
    static create() : CheckoutFacadeInterface {
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

        const facade = new CheckoutFacade(useCase);

        return facade;
    }
}