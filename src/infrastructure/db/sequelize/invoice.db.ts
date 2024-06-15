import { Umzug } from "umzug";
import ConnectionDb from "../../@shared/connection-pool.db.interface";
import { sequelize } from "../../config/db/db";
import { InvoiceModel } from "../../../module/invoice/repository/invoice.model";
import { InvoiceItensModel } from "../../../module/invoice/repository/invoice-items.model";
import { migrator } from "../../migrations/config-migrations/migrator";

export default class InvoiceDb implements ConnectionDb {
    private migration: Umzug<any>;

    async instance(): Promise<void> {
        sequelize.addModels([InvoiceModel, InvoiceItensModel]);
        await sequelize.sync();
        this.migration = migrator(sequelize);
        await this.migration.up();
    }
    async close(): Promise<void> {
        await this.migration.down();
        await sequelize.close();
    }

}