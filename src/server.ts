import express from 'express';
import { routerClient } from './api/routes/client-adm.routes';
import { routerStoreCatalog } from './api/routes/store-catalog.route';
import { routerCheckout } from './api/routes/checkout.router';
import { routerInvoice } from './api/routes/invoice.route';

export const app = express();

app.use(express.json());
app.use('/clients', routerClient);
app.use('/product', routerStoreCatalog);
// app.use('/catalog', routerStoreCatalog);
app.use('/checkout', routerCheckout);
app.use('/invoice', routerInvoice);
