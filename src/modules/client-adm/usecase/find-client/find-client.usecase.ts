import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { ClientGateway } from "../../gateway/client.gateway";
import {
  InputFindClientUseCaseDto,
  OutputFindClientUseCaseDto,
} from "./find-client.usecase.dto";

export class FindClientUseCase implements IUseCase {
  constructor(private readonly _clientRepository: ClientGateway) {}

  public async execute(
    input: InputFindClientUseCaseDto
  ): Promise<OutputFindClientUseCaseDto> {
    const client = await this._clientRepository.find(input.id);

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
