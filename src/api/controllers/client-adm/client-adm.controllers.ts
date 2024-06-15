import ClientAdmDB from "../../../infrastructure/db/sequelize/client-adm.db";
import ClientAdmFacadeFactory from "../../../module/client-adm/factory/facade.factory";
import { Request, Response } from "express";


export default class ClientAdmControllers {
    constructor() { }

    static async create(req: Request, res: Response): Promise<void> {
        const db = new ClientAdmDB();
        await db.instance();

        const useCase = ClientAdmFacadeFactory.create();

        try {
            await useCase.addClient({
                id:  req.body.id,
                name:  req.body.name,
                email:  req.body.email,
                document:  req.body.document,
                street:  req.body.street,
                city:  req.body.city,
                complement:  req.body.complement,
                number:  req.body.number,
                state:  req.body.state,
                zipCode:  req.body.zipCode,
            });

            res.send({status: "Criado com sucesso"});
        } catch (error) {
            res.status(500).send({
                status: "Erro ao criar cliente",
                error
            })
        } 

    }

    static async find(req: Request, res: Response){
        const db = new ClientAdmDB();
        await db.instance();
        const useCase = ClientAdmFacadeFactory.create();
        const clientId = req.params.id;

        try {
            const client = await useCase.findClient({clientId});
            res.send({
                id: client.id,
                name: client.name,
                document: client.document,
                email: client.email,
                address: {
                    street: client.street,
                    number: client.number,
                    complement: client.complement,
                    city: client.city,
                    state: client.state,
                    zipCode: client.zipCode,
                },
                createdAt: client.createdAt,
                updatedAt: client.updatedAt,
            });
        } catch (error) {
            res.status(500).send({
                status: "Cliente não encontrado",
                error,
            });
        }
    }
}
