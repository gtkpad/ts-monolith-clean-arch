import { Sequelize } from "sequelize-typescript";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../domain/transaction";
import { TransactionModel } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";

describe("TransactionRepository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a transaction", async () => {
    const repository = new TransactionRepository();
    const transaction = new Transaction({
      id: new Id("1"),
      orderId: "1",
      amount: 100,
    });

    transaction.approve();

    await repository.save(transaction);

    const transactionDb = await TransactionModel.findByPk("1");

    expect(transactionDb.id).toEqual(transaction.id.id);
    expect(transactionDb.orderId).toEqual(transaction.orderId);
    expect(transactionDb.amount).toEqual(transaction.amount);
    expect(transactionDb.status).toEqual(transaction.status);
  });
});
