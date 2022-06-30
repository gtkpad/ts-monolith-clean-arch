import { IPaymentFacade } from "../facade/facade.interface";
import { PaymentFacade } from "../facade/payment.facade";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";

export class PaymentFacadeFactory {
  static create(): IPaymentFacade {
    const repository = new TransactionRepository();
    const processPayment = new ProcessPaymentUseCase(repository);
    return new PaymentFacade({ processPayment });
  }
}
