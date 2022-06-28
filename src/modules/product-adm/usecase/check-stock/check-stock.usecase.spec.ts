import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { CheckStockUseCase } from "./check-stock.usecase";

const product = new Product({
  id: new Id("123"),
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 10,
  stock: 100,
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
});
describe("Unit test Check Stock use case", () => {
  it("should get stock of a product", async () => {
    const productRepository = MockRepository();
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const input = {
      productId: "123",
    };

    const output = await checkStockUseCase.execute(input);
    expect(productRepository.find).toHaveBeenLastCalledWith("123");
    expect(output.productId).toBe("123");
    expect(output.stock).toBe(100);
  });
});
