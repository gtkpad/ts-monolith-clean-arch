import { ClientAdmFacade } from "../facade/client-adm.facade";
import { IClientAdmFacade } from "../facade/client-adm.facade.interface";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";

export class ClientAdmFacadeFactory {
  static create(): IClientAdmFacade {
    const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    const findUseCase = new FindClientUseCase(repository);
    return new ClientAdmFacade({ addUseCase, findUseCase });
  }
}
