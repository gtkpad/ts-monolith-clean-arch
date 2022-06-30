import { Transaction } from "../domain/transaction";
import { PaymentGateway } from "../gateway/payment.gateway";
import { TransactionModel } from "./transaction.model";

export class TransactionRepository implements PaymentGateway {
  public async save(transaction: Transaction): Promise<Transaction> {
    await TransactionModel.create({
      id: transaction.id.id,
      amount: transaction.amount,
      orderId: transaction.orderId,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });

    return transaction;
  }
}
