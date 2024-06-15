import express, { Request, Response } from "express";
import StoreCatalogDb from "../../../infrastructure/db/sequelize/sotre-adm.db";
import StoreCatalogFacadeFactory from "../../../module/store-catalog/factory/facade.factory";
import ProductAdmFacadeFactory from "../../../module/product-adm/factory/facade.factory";

export default class StoreCatalogControllers {
    static async addProduct(req: Request, res: Response): Promise<void> {
        const db = new StoreCatalogDb();
        await db.instance();

        const useCase = StoreCatalogFacadeFactory.create();
        const useCaseProd = ProductAdmFacadeFactory.create();

        try {
            const product = await useCase.add({
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                salesPrice: req.body.salesPrice,
            });

            if (req.body.stock !== 0) {
                await useCaseProd.updateStock({ productId: req.body.id, stock: req.body.stock });
            }

            res.send(product);

        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: "Produto não cadastrado",
                error,
            });
        }
    }

    static async findAllProducts(req: Request, res: Response): Promise<void> {
        const db = new StoreCatalogDb();
        await db.instance();

        const useCase = StoreCatalogFacadeFactory.create();

        try {
            const products = await useCase.findAll();
            res.send(products);
        } catch (error) {
            res.status(500).send({
                status: "Produto não encontrado",
                error,
            });
        }
    }

    static async findProduct(req: Request, res: Response): Promise<void> {
        const db = new StoreCatalogDb();
        await db.instance();

        const useCase = StoreCatalogFacadeFactory.create();

        try {
            const product = await useCase.find({ id: req.params.id });

            res.send(product);
        } catch (error) {
            res.status(500).send({
                status: "Produto não encontrado",
                error,
            });
        }
    }
}