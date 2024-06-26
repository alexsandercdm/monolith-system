import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: "products-adm",
    tableName: "products",
    timestamps: false,
})
export class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare description: string;

    @Column({ allowNull: true })
    declare purchasePrice: number;

    @Column({ allowNull: true })
    declare stock: number;

    @Column({ allowNull: false })
    declare createdAt?: Date;

    @Column({ allowNull: false })
    declare updatedAt?: Date;
}

