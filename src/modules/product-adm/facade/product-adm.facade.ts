import { IUseCase } from "../../@shared/usecase/use-case.interface";
import { OutputAddProductDto } from "../usecase/add-product/add-product.dto";
import {
  InputAddProductAdmFacadeDto,
  InputCheckStockProductAdmFacadeDto,
  IProductAdmFacade,
  OutputCheckStockProductAdmFacadeDto,
} from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: IUseCase<InputAddProductAdmFacadeDto, OutputAddProductDto>;
  checkStockUseCase: IUseCase;
}

export class ProductAdmFacade implements IProductAdmFacade {
  private readonly _addProductUseCase: IUseCase<
    InputAddProductAdmFacadeDto,
    OutputAddProductDto
  >;
  private readonly _checkStockUseCase: IUseCase;

  constructor(useCasesProps: UseCaseProps) {
    this._addProductUseCase = useCasesProps.addUseCase;
    this._checkStockUseCase = useCasesProps.checkStockUseCase;
  }

  public async addProduct(input: InputAddProductAdmFacadeDto): Promise<void> {
    await this._addProductUseCase.execute(input);
  }

  public async checkStock(
    input: InputCheckStockProductAdmFacadeDto
  ): Promise<OutputCheckStockProductAdmFacadeDto> {
    return this._checkStockUseCase.execute(input);
  }
}
