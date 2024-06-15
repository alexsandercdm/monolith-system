import express from "express";
import StoreCatalogControllers from "../controllers/product/product.controllers";

export const routerStoreCatalog = express.Router();

routerStoreCatalog.post("/", StoreCatalogControllers.addProduct);
routerStoreCatalog.get("/", StoreCatalogControllers.findAllProducts);
routerStoreCatalog.get("/:id", StoreCatalogControllers.findProduct);