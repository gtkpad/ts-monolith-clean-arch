import { Sequelize } from "sequelize-typescript";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { ProductAdmFacade } from "./product-adm.facade";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    };

    await productAdmFacade.addProduct(input);

    const product = await ProductModel.findByPk("1");

    expect(product).toEqual(expect.objectContaining(input));
  });
});
