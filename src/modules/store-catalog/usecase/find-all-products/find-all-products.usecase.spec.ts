import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindAllProductsUseCase } from "./find-all-products.usecase";

const product1 = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Product 2 description",
  salesPrice: 200,
});

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
});

describe("Find all products usecase", () => {
  it("Should find all products", async () => {
    const productRepository = MockRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(
      productRepository
    );

    const expectedOutput = expect.arrayContaining([
      {
        id: "1",
        name: "Product 1",
        description: "Product 1 description",
        salesPrice: 100,
      },
      {
        id: "2",
        name: "Product 2",
        description: "Product 2 description",
        salesPrice: 200,
      },
    ]);

    const output = await findAllProductsUseCase.execute();
    expect(output.products).toHaveLength(2);
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
    expect(output.products).toEqual(expectedOutput);
  });
});
