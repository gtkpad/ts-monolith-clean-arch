import { ProductGateway } from "../../gateway/product.gateway";
import {
  InputCheckStockUseCaseDto,
  OutputCheckStockUseCaseDto,
} from "./check-stock.dto";

export class CheckStockUseCase {
  constructor(private readonly _productRepository: ProductGateway) {}

  public async execute(
    input: InputCheckStockUseCaseDto
  ): Promise<OutputCheckStockUseCaseDto> {
    const product = await this._productRepository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}
