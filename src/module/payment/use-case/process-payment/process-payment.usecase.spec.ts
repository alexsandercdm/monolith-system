import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usacase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved",
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    }
};


describe("Process Payment use case unit test", () => {
    it("Should approved a Process Payment", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 100,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toStrictEqual(transaction.createdAt);
        expect(result.updatedAt).toStrictEqual(transaction.updatedAt);
    });

    it("Should declined a Process Payment", async () => {

        const transaction = new Transaction({
            id: new Id("1"),
            amount: 50,
            orderId: "1",
            status: "declined",
        });
        
        const MockRepository = () => {
            return {
                save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
            }
        };

        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 50,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toStrictEqual(transaction.createdAt);
        expect(result.updatedAt).toStrictEqual(transaction.updatedAt);
    });
});