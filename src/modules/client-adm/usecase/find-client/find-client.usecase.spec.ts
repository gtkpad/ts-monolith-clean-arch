import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { FindClientUseCase } from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "email@email.com",
  address: "Rua 1",
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(client)),
});

describe("Find client use case tests", () => {
  it("should find client", async () => {
    const repository = MockRepository();
    const useCase = new FindClientUseCase(repository);

    const input = {
      id: "1",
    };

    const output = await useCase.execute(input);
    expect(repository.find).toBeCalledWith(input.id);
    expect(output.name).toEqual(client.name);
    expect(output.email).toEqual(client.email);
    expect(output.address).toEqual(client.address);
    expect(output.createdAt).toEqual(client.createdAt);
    expect(output.updatedAt).toEqual(client.updatedAt);
  });
});
