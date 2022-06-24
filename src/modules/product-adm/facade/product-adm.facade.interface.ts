export interface InputAddProductAdmFacadeDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface InputCheckStockProductAdmFacadeDto {
  productId: string;
}

export interface OutputCheckStockProductAdmFacadeDto {
  productId: string;
  stock: number;
}

export interface IProductAdmFacade {
  addProduct(input: InputAddProductAdmFacadeDto): Promise<void>;
  checkStock(
    input: InputCheckStockProductAdmFacadeDto
  ): Promise<OutputCheckStockProductAdmFacadeDto>;
}
