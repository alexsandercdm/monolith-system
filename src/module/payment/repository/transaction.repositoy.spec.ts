import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";
import Transaction from "../domain/transaction";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Transaction test repository", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save transaction", async () => {

        const transactionRepository = new TransactionRepository();

        const transaction = new Transaction({
            id: new Id("1"),
            orderId: "1",
            amount: 100,
        });

        transaction.aprove();

        const result = await transactionRepository.save(transaction);

        expect(result.id).toStrictEqual(transaction.id);
        expect(result.orderId).toBe(transaction.orderId);
        expect(result.amount).toBe(transaction.amount);
        expect(result.status).toBe("approved");
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();

    });
});