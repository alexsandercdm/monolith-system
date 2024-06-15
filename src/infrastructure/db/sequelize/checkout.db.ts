import { Umzug } from "umzug";
import ConnectionDb from "../../@shared/connection-pool.db.interface";
import { sequelize } from "../../config/db/db";
import ProductModel from "../../../module/store-catalog/repository/product.model";
import { ProductModel as ProductAdmModel } from "../../../module/product-adm/repository/product.model";
import ClientModel from "../../../module/client-adm/repository/client-adm.model";
import { OrderModel } from "../../../module/checkout/repository/order.model";
import ItemOrderModel from "../../../module/checkout/repository/item-order.model";
import { migrator } from "../../migrations/config-migrations/migrator";
import TransactionModel from "../../../module/payment/repository/transaction.model";
import { InvoiceModel } from "../../../module/invoice/repository/invoice.model";
import { InvoiceItensModel } from "../../../module/invoice/repository/invoice-items.model";

export default class CheckoutDb implements ConnectionDb {
    private migration: Umzug<any>;
    constructor(){};
    
    async instance(): Promise<void> {
        sequelize.addModels([TransactionModel, ProductModel, ClientModel, OrderModel, ItemOrderModel, ProductAdmModel, InvoiceModel, InvoiceItensModel]);
        await sequelize.sync();
        this.migration = migrator(sequelize);
        await this.migration.up();
    }
    
    async close(): Promise<void> {
        await sequelize.close();
    }

}