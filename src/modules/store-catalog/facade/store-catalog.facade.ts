import { IUseCase } from "../../@shared/usecase/use-case.interface";
import {
  InputFindProductDto,
  OutputFindProductDto,
} from "../usecase/find-product/find-product.dto";
import {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
  IStoreCatalogFacade,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: IUseCase<InputFindProductDto, OutputFindProductDto>;
  findAllUseCase: IUseCase<any, FindAllStoreCatalogFacadeOutputDto>;
}

export class StoreCatalogFacade implements IStoreCatalogFacade {
  private _findUseCase: IUseCase<InputFindProductDto, OutputFindProductDto>;
  private _findAllUseCase: IUseCase<any, FindAllStoreCatalogFacadeOutputDto>;

  constructor(props: UseCaseProps) {
    this._findAllUseCase = props.findAllUseCase;
    this._findUseCase = props.findUseCase;
  }

  public async find(
    input: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(input);
  }

  public async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute({});
  }
}
