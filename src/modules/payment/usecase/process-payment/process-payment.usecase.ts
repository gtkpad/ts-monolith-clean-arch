import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { Transaction } from "../../domain/transaction";
import { PaymentGateway } from "../../gateway/payment.gateway";
import {
  InputProcessPaymentUseCaseDto,
  OutputProcessPaymentUseCaseDto,
} from "./process-payment.usecase.dto";

export class ProcessPaymentUseCase implements IUseCase {
  constructor(private readonly _transactionRepository: PaymentGateway) {}

  public async execute(
    input: InputProcessPaymentUseCaseDto
  ): Promise<OutputProcessPaymentUseCaseDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });

    transaction.process();

    const persistTransaction = await this._transactionRepository.save(
      transaction
    );

    return {
      id: persistTransaction.id.id,
      amount: persistTransaction.amount,
      orderId: persistTransaction.orderId,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    };
  }
}
