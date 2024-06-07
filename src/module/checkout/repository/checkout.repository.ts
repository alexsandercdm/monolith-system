import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import FindClientUsecase from "../../client-adm/usecase/find-client/find-client.usacase";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ItemOrderModel from "./item-order.model";
import { OrderModel } from "./order.model";

export default class CheckoutRepository implements CheckoutGateway {

    async addOrder(order: Order): Promise<void> {
        const clientUseCase = ClientAdmFacadeFactory.create();
        const productUseCase = StoreCatalogFacadeFactory.create();

        const client = await  clientUseCase.findClient({clientId: order.client.id.id});

        if (!client) {
            throw new Error("Client Not Found");
        }

        const myOrder = await OrderModel.create({
            id: order.id.id,
            invoiceId: order.invoiceId,
            status: order.status,
            client: client.id,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        });

        for (const product of order.products) {
            let prod = await productUseCase.find({id: product.id.id});

            if (!prod) {
                throw new Error("Product Not Found")
            }

            const newProduct = new Product({
                id: new Id(product.id.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrices,
            });

            await ItemOrderModel.create({
                id: newProduct.id.id,
                productId: product.id.id,
                name: newProduct.name,
                orderId: myOrder.id,
                description: newProduct.description,
                salesPrice: newProduct.salesPrices,
                createdAt: newProduct.createdAt,
                updatedAt: newProduct.updatedAt,
            });
        }
    }
    findOrder(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

}