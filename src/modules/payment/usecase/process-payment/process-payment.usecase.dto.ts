export interface InputProcessPaymentUseCaseDto {
  amount: number;
  orderId: string;
}

export interface OutputProcessPaymentUseCaseDto {
  transactionId: string;
  status: string;
  amount: number;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}
