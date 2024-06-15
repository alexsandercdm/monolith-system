import express, { Request, Response } from "express";
import AddProductUseCase from "../module/product-adm/usecase/add-product/add-product.usecase";
import ProductAdmFacadeFactory from "../module/product-adm/factory/facade.factory";
import { AddProducFacadeInputDto } from "../module/product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeFactory from "../module/store-catalog/factory/facade.factory";
import { AddProductInputDto } from "../module/store-catalog/use-case/add-product/add-product.dto";

export const productRegistrationRoute = express.Router();
export const productRoute = express.Router();

productRegistrationRoute.post('/', async (req: Request, res: Response) => {
    const useCase = ProductAdmFacadeFactory.create();

    try {
        const productAddDto: AddProducFacadeInputDto = {
            id: req.body.id, 
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock,
        }

        const output = await useCase.addProduct(productAddDto);
        res.send(output);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = StoreCatalogFacadeFactory.create();

    try {
        const productDto: AddProductInputDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            salesPrice: req.body.salesPrice,
        };

        const prod = await useCase.add(productDto);

        res.send(prod)
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});