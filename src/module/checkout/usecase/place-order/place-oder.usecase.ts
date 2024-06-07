import UserCaseInterface from "../../../@shared/domain/use-case/use-case-interface";
import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/facade.interface.dto";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutRepository from "../../repository/checkout.repository";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";


export default class PlaceOrderUseCase implements UserCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;
    private _repository: CheckoutRepository;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface;

    constructor(clientFacade: ClientAdmFacadeInterface,
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogFacadeInterface,
        repository: CheckoutRepository,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface,) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
        this._repository = repository;
        this._invoiceFacade = invoiceFacade;
        this._paymentFacade = paymentFacade;

    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

        const client = await this._clientFacade.findClient({ clientId: input.clientId });

        if (!client) {
            throw new Error("Client not found");
        }

        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map((p) => this.getProduct(p.productId))
        );

        const myClient = new Client(
            {
                id: new Id(client.id),
                name: client.name,
                email: client.email,
                document: client.document,
                address: new Address({
                    street: "Street 1",
                    city: "City 1",
                    complement: "Complement 1",
                    number: "000",
                    state: "State 1",
                    zipCode: "000",
                }),
            }
        );

        const order = new Order({
            client: myClient,
            products,
        });

        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total,
        })

        const invoice = payment.status === "approved" ?
            await this._invoiceFacade.generate({
                name: client.name,
                document: client.document,
                street: client.street,
                number: client.number,
                complement: client.complement,
                city: client.city,
                state: client.state,
                zipCode: client.zipCode,
                items: products.map((p) => {
                    return {
                        id: p.id.id,
                        name: p.name,
                        price: p.salesPrices,
                    }
                }),
            }) : null;

        payment.status === "approved" && order.approved();
        order.setInvoiceId = payment.status === "approved" && !invoice ? invoice.id : "";
        this._repository.addOrder(order);

        return {
            id: order.id.id,
            invoiceId: payment.status === "approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p) => {
                return {
                    productId: p.id.id
                }
            }),
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected");
        }

        for (const p of input.products) {
            const product = await this._productFacade.checkStock({ productId: p.productId });

            if (product.stock <= 0) {
                throw new Error(
                    `Product ${product.productId} is not available in stock`
                )
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {

        const product = await this._catalogFacade.find({ id: productId });

        if (!product) {
            throw new Error("Product not found");
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        })

    }

}