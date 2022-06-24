import { Sequelize } from "sequelize-typescript";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";
import { ProductModel } from "./product.model";
import { ProductRepository } from "./product.repository";

describe("ProductRepository Test", () => {
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
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findByPk(product.id.id);

    expect(product.id.id).toEqual(productDb.id);
    expect(product.name).toEqual(productDb.name);
    expect(product.description).toEqual(productDb.description);
    expect(product.purchasePrice).toEqual(productDb.purchasePrice);
    expect(product.stock).toEqual(productDb.stock);
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();
    const productData = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    ProductModel.create(productData);

    const findedProduct = await productRepository.find("1");
    expect(findedProduct.id.id).toEqual(productData.id);
    expect(findedProduct.name).toEqual(productData.name);
    expect(findedProduct.description).toEqual(productData.description);
    expect(findedProduct.purchasePrice).toEqual(productData.purchasePrice);
    expect(findedProduct.stock).toEqual(productData.stock);
    expect(findedProduct.createdAt).toEqual(productData.createdAt);
    expect(findedProduct.updatedAt).toEqual(productData.updatedAt);
  });
});
