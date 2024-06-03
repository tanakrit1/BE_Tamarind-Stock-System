import { Injectable } from "@nestjs/common";
import { Import_DepositRepository } from "../repositories/import_deposit.repository";
import { Import_DepositModel, Import_DepositPaginationModel } from "../models/import_deposit.model";
import { CreateImport_DepositDto, UpdateImport_DepositDto } from "../dto/import_deposit/import_deposit.dto";
import { plainToInstance } from "class-transformer";
import { SupplierService } from "./supplier.service";
import { SupplierModel } from "../models/supplier.model";

@Injectable()
export class Import_DepositService {
  constructor(
    private readonly import_depositRepository: Import_DepositRepository,
    private readonly supplierService: SupplierService
  ) { }

  async findById(id: number): Promise<Import_DepositModel> {
    return await this.import_depositRepository.findById(id);
  }

  async search(dto): Promise<Import_DepositPaginationModel> {
    const models = await this.import_depositRepository.search(dto);
    return models
  }

  async update(dto: UpdateImport_DepositDto): Promise<Import_DepositModel> {
    const model: Import_DepositModel = plainToInstance(Import_DepositModel, {
      ...dto,
      product: dto.product_id,
      supplier: dto.supplier_id
    })
    return await this.import_depositRepository.save(model);
  }

  async create(dto: CreateImport_DepositDto): Promise<Import_DepositModel> {
    const supplierExist = {
      ...(await this.supplierService.findByPhone(dto.phone)),
      ...dto
    }
    let supplierModel = new SupplierModel();
    supplierModel = await this.supplierService.create(supplierExist);

    const model: Import_DepositModel = plainToInstance(Import_DepositModel, {
      ...dto,
      user: dto.user_id,
      product: dto.product_id,
      supplier: supplierModel
    })
    return await this.import_depositRepository.save(model);
  }
}