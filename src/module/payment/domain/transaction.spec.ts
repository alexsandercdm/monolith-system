import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "./transaction";


describe("Transaction unit test", () => {
    it("Should return a object of transaction with orderId and amount", () => {
        const transaction = new Transaction({
            orderId: "1",
            amount: 100,
        });

        expect(transaction).toBeDefined();
        expect(transaction.id).toBeDefined();
        expect(transaction.orderId).toBe("1");
        expect(transaction.amount).toBe(100);
        expect(transaction.status).toBe("pending");
        expect(transaction.createdAt).toBeDefined();
        expect(transaction.updatedAt).toBeDefined()

    });

    it("Should return a object of transaction all fields", () => {
        const date = new Date();
        const transaction = new Transaction({
            id: new Id("1"),
            orderId: "1",
            amount: 100,
            status: "pending",
            createdAt: date,
            updatedAt: date,
        });

        expect(transaction).toBeDefined();
        expect(transaction.id.id).toBe("1");
        expect(transaction.orderId).toBe("1");
        expect(transaction.amount).toBe(100);
        expect(transaction.status).toBe("pending");
        expect(transaction.createdAt).toStrictEqual(date);
        expect(transaction.updatedAt).toStrictEqual(date);

    });

    it("Should validate a object of transaction with amount greather than zero", () => {

        expect(() => {
            new Transaction({ orderId: "1", amount: -10, })
        }).toThrow("Amount must be greather than 0");

    });

    it("Should validate a object of transaction aproved", () => {
        const date = new Date();
        const transaction = new Transaction({
            id: new Id("1"),
            orderId: "1",
            amount: 100,
            status: "pending",
            createdAt: date,
            updatedAt: date,
        });

        transaction.process();

        expect(transaction).toBeDefined();
        expect(transaction.id.id).toBe("1");
        expect(transaction.orderId).toBe("1");
        expect(transaction.amount).toBe(100);
        expect(transaction.status).toBe("approved");
        expect(transaction.createdAt).toStrictEqual(date);
        expect(transaction.updatedAt).toStrictEqual(date);

    });
});