import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "../domain/client.entity";
import { ClientGateway } from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export class ClientRepository implements ClientGateway {
  public async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
  public async find(id: string): Promise<Client> {
    const client = await ClientModel.findByPk(id);

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
