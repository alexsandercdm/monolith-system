import UserCaseInterface from "../../../@shared/domain/use-case/use-case-interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/process-payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UserCaseInterface {
    private _repositoryPayment: PaymentGateway;

    constructor(repository: PaymentGateway) {
        this._repositoryPayment = repository;
    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            orderId: input.orderId,
            amount: input.amount,
        });

        transaction.process();

        const persistTransaction = await this._repositoryPayment.save(transaction);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
        }
    }

}