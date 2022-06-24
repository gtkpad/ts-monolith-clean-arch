import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { ProductGateway } from "../../gateway/product.gateway";
import { InputAddProductDto, OutputAddProductDto } from "./add-product.dto";

export class AddProductUseCase {
  constructor(private readonly productRepository: ProductGateway) {}

  public async execute(
    input: InputAddProductDto
  ): Promise<OutputAddProductDto> {
    const { name, description, purchasePrice, stock } = input;
    const props = {
      id: new Id(input.id),
      name,
      description,
      purchasePrice,
      stock,
    };
    const product = new Product(props);
    await this.productRepository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
