import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InferAttributes, InferCreationAttributes } from "sequelize";

@Table({
    tableName: "invoice_items",
    timestamps: false,
})
export class InvoiceItensModel extends Model{

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    @ForeignKey(() => InvoiceModel)
    declare invoiceId: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;
}

