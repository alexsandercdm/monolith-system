import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/process-payment.gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway {

    async save(input: Transaction): Promise<Transaction> {
        const transaction = await TransactionModel.create({
            id: input.id.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        }

        );

        return new Transaction({
            id: new Id(transaction.id),
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        });
    }

}