import { where } from "sequelize";
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

        const client = await clientUseCase.findClient({ clientId: order.client.id.id });

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

        const prodId: Id[] = [];

        order.products.forEach((p) => prodId.push(p.id));

        let prod = prodId.map(async (p) => {
            const data = await productUseCase.find({ id: p.id });

            if (!data) {
                throw new Error("Product Not Found");
            }

            return data;
        });

        
        Promise.all(prod).then(async (a) => {
            for (var b of a) {
                await ItemOrderModel.create({
                    id: b.id,
                    productId: b.id,
                    name: b.name,
                    orderId: myOrder.id,
                    description: b.description,
                    salesPrice: b.salesPrice,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
        });
    }

    findOrder(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

}