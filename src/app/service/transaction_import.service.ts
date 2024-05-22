import { Injectable } from "@nestjs/common";
import { Transaction_ImportRepository } from "../repositories/transaction_import.repository";
import { Transaction_ImportModel, Transaction_ImportPaginationModel } from "../models/transaction_import.model";
import { CreateTransaction_ImportDto } from "../dto/transaction_import/transaction_import.dto";
import { plainToInstance } from "class-transformer";
import { SupplierService } from "./supplier.service";
import { SupplierModel } from "../models/supplier.model";

@Injectable()
export class Transaction_ImportService {
  constructor(
    private readonly transaction_importRepository: Transaction_ImportRepository,
    private readonly supplierService: SupplierService
  ) { }

  async search(dto): Promise<Transaction_ImportPaginationModel> {
    const models = await this.transaction_importRepository.search(dto);
    return models
  }

  async create(dto: CreateTransaction_ImportDto): Promise<Transaction_ImportModel> {
    const supplierExist = { 
      ...(await this.supplierService.findByPhone(dto.phone)),
      ...dto
    }
    let supplierModel = new SupplierModel();
    supplierModel = await this.supplierService.create(supplierExist);

    const model: Transaction_ImportModel = plainToInstance(Transaction_ImportModel, {
      ...dto,
      user:dto.user_id,
      product:dto.product_id,
      supplier:supplierModel
    })
    return await this.transaction_importRepository.save(model);
}

}