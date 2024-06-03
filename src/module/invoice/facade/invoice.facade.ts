import UserCaseInterface from "../../@shared/domain/use-case/use-case-interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenereateInvoiceFacadeOutputDto } from "./facade.interface.dto";

type InvoiceFacadeProps = {
    findUseCase: UserCaseInterface;
    generateUseCase: UserCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(private usecase: InvoiceFacadeProps){}
    
    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this.usecase.findUseCase.execute(input);
    }
    
    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenereateInvoiceFacadeOutputDto> {
        const result = await this.usecase.generateUseCase.execute(input);

        return {
            id: result.id,
            name: result.name,
            document: result.document,
            street: result.street,
            number: result.number,
            complement: result.complement,
            city: result.city,
            state: result.state,
            zipCode: result.zipCode,
            items: result.items.map((item: { id: { id: string; }; name: string; price: number; }) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                }
            }),
            total: result.total,
        }
    }

}