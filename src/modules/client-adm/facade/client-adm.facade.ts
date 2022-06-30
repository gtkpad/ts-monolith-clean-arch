import { IUseCase } from "../../@shared/usecase/use-case.interface";
import {
  InputAddClientUseCaseDto,
  OutputAddClientUseCaseDto,
} from "../usecase/add-client/add-client.usecase.dto";
import {
  InputFindClientUseCaseDto,
  OutputFindClientUseCaseDto,
} from "../usecase/find-client/find-client.usecase.dto";
import {
  IClientAdmFacade,
  InputAddClientFacadeDto,
  InputFindClientFacadeDto,
  OutputFindClientFacadeDto,
} from "./client-adm.facade.interface";

type ClientAdmFacadeProps = {
  findUseCase: IUseCase<InputFindClientUseCaseDto, OutputFindClientUseCaseDto>;
  addUseCase: IUseCase<InputAddClientUseCaseDto, OutputAddClientUseCaseDto>;
};

export class ClientAdmFacade implements IClientAdmFacade {
  private _findUseCase: IUseCase<
    InputFindClientUseCaseDto,
    OutputFindClientUseCaseDto
  >;
  private _addUseCase: IUseCase<
    InputAddClientUseCaseDto,
    OutputAddClientUseCaseDto
  >;

  constructor(props: ClientAdmFacadeProps) {
    this._findUseCase = props.findUseCase;
    this._addUseCase = props.addUseCase;
  }

  public async add(input: InputAddClientFacadeDto): Promise<void> {
    await this._addUseCase.execute(input);
  }

  public async find(
    input: InputFindClientFacadeDto
  ): Promise<OutputFindClientFacadeDto> {
    return this._findUseCase.execute(input);
  }
}
