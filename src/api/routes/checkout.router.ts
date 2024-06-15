import express from "express";
import CheckoutController from "../controllers/checkout/checkout.controllers";

export const routerCheckout = express.Router();

routerCheckout.post('/', CheckoutController.createOrder);