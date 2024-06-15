import { Request, Response } from "express";
import CheckoutDb from "../../../infrastructure/db/sequelize/checkout.db";
import CheckoutFacadeFactory from "../../../module/checkout/factory/checkout-facade.factory";

export default class CheckoutController {
    constructor() { };

    static async createOrder(req: Request, res: Response): Promise<void> {
        const db = new CheckoutDb();
        await db.instance();

        const useCaseFacade = CheckoutFacadeFactory.create();
        const productId = req.body.products as { productId: string }[];

        const input = {
            clientId: req.body.clientId,
            products: productId.map((p) => { return { productId: p.productId } }),
        };

        try {
            
            const order = await useCaseFacade.addPlaceOrder(input);

            res.send(order);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: "Order not created",
                error
            });
        }
    }
}