import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import { IStoreCatalogFacade } from "../facade/store-catalog.facade.interface";
import { ProductRepository } from "../repository/product.repository";
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase";

export class StoreCatalogFacadeFactory {
  static create(): IStoreCatalogFacade {
    const productsRepository = new ProductRepository();
    const findAllUseCase = new FindAllProductsUseCase(productsRepository);
    const findUseCase = new FindProductUseCase(productsRepository);

    return new StoreCatalogFacade({
      findUseCase,
      findAllUseCase,
    });
  }
}
