import { IUseCase } from "../../@shared/usecase/use-case.interface";
import {
  InputProcessPaymentUseCaseDto,
  OutputProcessPaymentUseCaseDto,
} from "../usecase/process-payment/process-payment.usecase.dto";
import { InputPaymentFacadeDto, IPaymentFacade } from "./facade.interface";

type PaymentFacadeProps = {
  processPayment: IUseCase<
    InputProcessPaymentUseCaseDto,
    OutputProcessPaymentUseCaseDto
  >;
};

export class PaymentFacade implements IPaymentFacade {
  private _processPayment: IUseCase<
    InputProcessPaymentUseCaseDto,
    OutputProcessPaymentUseCaseDto
  >;

  constructor(props: PaymentFacadeProps) {
    this._processPayment = props.processPayment;
  }

  public async process(
    input: InputPaymentFacadeDto
  ): Promise<OutputProcessPaymentUseCaseDto> {
    return this._processPayment.execute(input);
  }
}
