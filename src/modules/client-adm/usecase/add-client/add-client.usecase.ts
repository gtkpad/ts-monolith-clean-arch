import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { Client } from "../../domain/client.entity";
import { ClientGateway } from "../../gateway/client.gateway";
import {
  InputAddClientUseCaseDto,
  OutputAddClientUseCaseDto,
} from "./add-client.usecase.dto";

export class AddClientUseCase implements IUseCase {
  constructor(private readonly _clientRepository: ClientGateway) {}

  public async execute(
    input: InputAddClientUseCaseDto
  ): Promise<OutputAddClientUseCaseDto> {
    const props = {
      name: input.name,
      email: input.email,
      address: input.address,
    };

    const client = new Client(props);
    await this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
