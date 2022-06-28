import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export class FindAllProductsUseCase implements IUseCase {
  constructor(private readonly productsRepository: ProductGateway) {}

  public async execute(): Promise<FindAllProductsDto> {
    const products = await this.productsRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id.id,
        description: product.description,
        name: product.name,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
