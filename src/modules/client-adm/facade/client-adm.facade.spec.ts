import { Sequelize } from "sequelize-typescript";
import { ClientAdmFacadeFactory } from "../factory/client-adm.facade.factory";
import { ClientModel } from "../repository/client.model";

describe("Client adm facade tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    await facade.add({
      id: "1",
      name: "Client 1",
      email: "teste@email.com",
      address: "Rua 1",
    });

    const client = await ClientModel.findByPk("1");

    expect(client).toBeDefined();
    expect(client.id).toEqual("1");
    expect(client.name).toEqual("Client 1");
    expect(client.email).toEqual("teste@email.com");
    expect(client.address).toEqual("Rua 1");
  });

  it("Should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "teste@email.com",
      address: "Rua 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toEqual("1");
    expect(client.name).toEqual("Client 1");
    expect(client.email).toEqual("teste@email.com");
    expect(client.address).toEqual("Rua 1");
  });
});
