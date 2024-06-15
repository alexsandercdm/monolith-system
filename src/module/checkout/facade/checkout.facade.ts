import UserCaseInterface from "../../@shared/domain/use-case/use-case-interface";
import CheckoutFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {
    constructor(private usecase: UserCaseInterface){}
    async addPlaceOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        const result = await this.usecase.execute(input);

        return result;
    }

}