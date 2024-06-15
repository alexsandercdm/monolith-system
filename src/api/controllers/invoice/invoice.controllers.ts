import { Request, Response } from "express";
import InvoiceDb from "../../../infrastructure/db/sequelize/invoice.db";
import InvoiceFacadeFactory from "../../../module/invoice/factory/facade.factory";

export default class InvoiceControllers {
    constructor(){}

    static async find(req: Request, res: Response) {
        const db = new InvoiceDb();
        await db.instance();
        const useCase = InvoiceFacadeFactory.create();
        console.log("INVOICE 1 -----> ", req.params.id);


        try {
            const invoice = await useCase.find({id: req.params.id});
            console.log("INVOICE -----> ", invoice);

            res.send(invoice);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: "Invoice não encontrada",
                error,
            })
        }
    }
}