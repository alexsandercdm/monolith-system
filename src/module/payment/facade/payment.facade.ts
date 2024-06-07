import UserCaseInterface from "../../@shared/domain/use-case/use-case-interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    private _processPaymentUseCase: UserCaseInterface;
    constructor(processPaymentUseCase: UserCaseInterface) {
        this._processPaymentUseCase = processPaymentUseCase;
    }

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this._processPaymentUseCase.execute(input);
    }

}