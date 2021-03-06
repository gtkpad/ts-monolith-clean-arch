import { Sequelize } from "sequelize-typescript";
import { PaymentFacadeFactory } from "../factory/payment.facade.factory";
import { TransactionModel } from "../repository/transaction.model";

describe("PaymentFacade unit test", () => {
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
    const facade = PaymentFacadeFactory.create();

    const input = {
      amount: 100,
      orderId: "1",
    };

    const output = await facade.process(input);

    expect(output.id).toBeDefined();
    expect(output.orderId).toEqual(input.orderId);
    expect(output.amount).toEqual(input.amount);
    expect(output.status).toEqual("approved");
  });
});
