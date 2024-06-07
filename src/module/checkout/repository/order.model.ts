import { Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { NonAttribute } from "sequelize";
import ItemOrderModel from "./item-order.model";


@Table({
    tableName: "orders",
    timestamps: false,
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare client: string;

    @Column({ allowNull: false })
    declare status: string;

    @HasMany(() => ItemOrderModel, "orderId")
    declare products: ItemOrderModel[];
}

