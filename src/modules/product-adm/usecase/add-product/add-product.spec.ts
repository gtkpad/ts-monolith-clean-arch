import { AddProductUseCase } from "./add-product.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe("Add product use case unit test", () => {
  it("should add a product", async () => {
    const productRepository = MockRepository();
    const useCase = new AddProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    const output = await useCase.execute(input);
    expect(productRepository.add).toHaveBeenCalled();
    expect(output.id).toBeDefined();
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
    expect(output).toEqual(expect.objectContaining({ ...input }));
  });
});
