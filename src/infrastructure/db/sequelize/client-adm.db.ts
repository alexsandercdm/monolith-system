import { Umzug } from "umzug";
import ClientModel from "../../../module/client-adm/repository/client-adm.model";
import ConnectionDb from "../../@shared/connection-pool.db.interface";
import { sequelize } from "../../config/db/db";
import { migrator } from "../../migrations/config-migrations/migrator";

export default class ClientAdmDB implements ConnectionDb {
    private migration: Umzug<any>;
    constructor(){}

    async close(): Promise<void> {
        await sequelize.close();
    }
    
    async instance(): Promise<void> {
        sequelize.addModels([ClientModel]);
        await sequelize.sync({});
        this.migration = migrator(sequelize);
        await this.migration.up();
    }
    
    
}