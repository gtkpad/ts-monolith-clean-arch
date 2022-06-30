export interface InputPaymentFacadeDto {
  orderId: string;
  amount: number;
}

export interface OutputPaymentFacadeDto {
  id: string;
  amount: number;
  orderId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentFacade {
  process(input: InputPaymentFacadeDto): Promise<OutputPaymentFacadeDto>;
}
