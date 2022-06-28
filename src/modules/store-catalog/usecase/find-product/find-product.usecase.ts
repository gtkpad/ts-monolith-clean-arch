import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import { InputFindProductDto, OutputFindProductDto } from "./find-product.dto";

export class FindProductUseCase implements IUseCase {
  constructor(private readonly productsRepository: ProductGateway) {}

  public async execute(
    input: InputFindProductDto
  ): Promise<OutputFindProductDto> {
    const product = await this.productsRepository.find(input.id);

    return {
      id: product.id.id,
      description: product.description,
      name: product.name,
      salesPrice: product.salesPrice,
    };
  }
}
