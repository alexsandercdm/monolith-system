import express from "express";
import InvoiceControllers from "../controllers/invoice/invoice.controllers";

export const routerInvoice = express.Router();

routerInvoice.get('/:id', InvoiceControllers.find);
