import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/invoice.item";
import InvoiceGateway from "../gateway/invoice-gateway";
import { InvoiceItensModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ where: { id: id } });
        const itens = await InvoiceItensModel.findAll()

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
            }),
            items: itens.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                });
            }),
        });
    }



    async create(input: Invoice): Promise<Invoice> {
        const invoice = await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });

        let itens: InvoiceItems[] = [];

        for (var i = 0; i < input.items.length; ++i) {

            const item = await InvoiceItensModel.create({
                id: input.items[i].id.id,
                invoiceId: invoice.id,
                name: input.items[i].name,
                price: input.items[i].price,
            });

            itens.push(
                new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                }));
        }

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address({
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
            }),
            items: itens,
        });
    }

}