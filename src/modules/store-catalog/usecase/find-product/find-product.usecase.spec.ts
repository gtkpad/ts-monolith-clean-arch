import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindProductUseCase } from "./find-product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 100,
});

const MockRepository = () => ({
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(product),
});

describe("Find a product unit test", () => {
  it("Should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: "1",
    };
    const output = await useCase.execute(input);

    expect(productRepository.find).toHaveBeenCalledWith(input.id);
    expect(output.id).toBe(product.id.id);
    expect(output.name).toBe(product.name);
    expect(output.description).toBe(product.description);
    expect(output.salesPrice).toBe(product.salesPrice);
  });
});
