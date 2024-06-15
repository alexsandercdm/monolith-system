import { Sequelize } from "sequelize-typescript";


export const sequelize: Sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false,
    sync: {force: false},
})
