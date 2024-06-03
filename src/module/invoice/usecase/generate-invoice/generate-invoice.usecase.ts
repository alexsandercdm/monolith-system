import { number } from "yup";
import UserCaseInterface from "../../../@shared/domain/use-case/use-case-interface";
import Invoice from "../../domain/invoice";
import InvoiceGateway from "../../gateway/invoice-gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";
import Address from "../../../@shared/domain/value-object/address.value-object";
import InvoiceItems from "../../domain/invoice.item";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class GenerateInvoiceUseCase implements UserCaseInterface {

    constructor(private repository: InvoiceGateway) { }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            }),
            items: input.items.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                });
            }),
        });
        
        const result = await this.repository.create(invoice);


        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            street: result.address.street,
            number: result.address.number,
            complement: result.address.complement,
            city: result.address.city,
            state: result.address.state,
            zipCode: result.address.zipCode,
            items: result.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                }
            }),
            total: result.total,
        }
    }

}