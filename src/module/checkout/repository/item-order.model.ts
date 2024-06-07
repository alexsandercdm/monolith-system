import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";

@Table({
    tableName: "item_order",
    timestamps: false,
})
export default class ItemOrderModel extends Model {
    
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare productId: string;

    @Column({allowNull: false})
    @ForeignKey(() => OrderModel)
    declare orderId: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare description: string;

    @Column({allowNull: false})
    declare salesPrice: number;

    @Column({allowNull: false})
    declare createdAt?: Date;

    @Column({allowNull: false})
    declare updatedAt?: Date;
}
