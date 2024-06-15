import ClientAdmControllers from "../controllers/client-adm/client-adm.controllers";
import express from "express";

export const routerClient = express.Router()

routerClient.post('/', ClientAdmControllers.create);

routerClient.get("/:id", ClientAdmControllers.find);