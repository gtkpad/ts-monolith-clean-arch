export interface InputCheckStockUseCaseDto {
  productId: string;
}

export interface OutputCheckStockUseCaseDto {
  productId: string;
  stock: number;
}
