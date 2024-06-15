import { Umzug } from "umzug";
import { sequelize } from "../../config/db/db";
import ConnectionDb from "../../@shared/connection-pool.db.interface";
import { ProductModel } from "../../../module/product-adm/repository/product.model";
import { migrator } from "../../migrations/config-migrations/migrator";

export default class ProductAdmDb implements ConnectionDb {
    private migration: Umzug<any>;

    constructor(){};
    
    async instance(): Promise<void> {
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
        this.migration = migrator(sequelize);
        this.migration.up();
    }
;

    async close(): Promise<void> {
        await sequelize.close();
    }

}