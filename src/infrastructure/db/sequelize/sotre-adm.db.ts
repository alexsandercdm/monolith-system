import { Umzug } from "umzug";
import ConnectionDb from "../../@shared/connection-pool.db.interface";
import { sequelize } from "../../config/db/db";
import ProductModel from "../../../module/store-catalog/repository/product.model";
import { ProductModel as ProductAdmModel } from "../../../module/product-adm/repository/product.model";
import { migrator } from "../../migrations/config-migrations/migrator";

export default class StoreCatalogDb implements ConnectionDb {
    private migration: Umzug<any>;

    constructor() { };

    async instance(): Promise<void> {
        sequelize.addModels([ProductModel, ProductAdmModel]);
        await sequelize.sync();
        this.migration = migrator(sequelize);
        this.migration.up();
    };

    async close(): Promise<void> {
        await sequelize.close();
    }

}