import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe("Add client use case tests", () => {
  it("should add client", async () => {
    const mockRepository = MockRepository();
    const addClientUseCase = new AddClientUseCase(mockRepository);
    const input = {
      name: "Client 1",
      email: "teste@email.com",
      address: "Rua 1",
    };
    const output = await addClientUseCase.execute(input);
    expect(mockRepository.add).toHaveBeenCalled();
    expect(output).toEqual(expect.objectContaining(input));
    expect(output.id).toBeDefined();
  });
});
