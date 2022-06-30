import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../../domain/transaction";
import { ProcessPaymentUseCase } from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  status: "approved",
  orderId: "1",
});

const MockRepository = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
});

const transactionDeclined = new Transaction({
  id: new Id("1"),
  amount: 100,
  status: "declined",
  orderId: "1",
});

const MockRepositoryDeclined = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
});

describe("ProcessPaymentUseCase unit test", () => {
  it("should approve a transaction", async () => {
    const repository = MockRepository();
    const usecase = new ProcessPaymentUseCase(repository);
    const input = {
      amount: 100,
      orderId: "1",
    };
    const output = await usecase.execute(input);
    expect(output).toEqual({
      transactionId: expect.any(String),
      amount: 100,
      orderId: "1",
      status: "approved",
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });
  });

  it("should decline a transaction", async () => {
    const repository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUseCase(repository);
    const input = {
      amount: 50,
      orderId: "1",
    };
    const output = await usecase.execute(input);
    expect(output).toEqual({
      transactionId: expect.any(String),
      amount: 100,
      orderId: "1",
      status: "declined",
      createdAt: transactionDeclined.createdAt,
      updatedAt: transactionDeclined.updatedAt,
    });
  });
});
