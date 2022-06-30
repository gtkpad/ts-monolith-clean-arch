export interface InputProcessPaymentUseCaseDto {
  amount: number;
  orderId: string;
}

export interface OutputProcessPaymentUseCaseDto {
  id: string;
  status: string;
  amount: number;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}
