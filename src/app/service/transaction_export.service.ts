import { Injectable } from "@nestjs/common";
import { Transaction_ImportModel } from "../models/transaction_import.model";
import { plainToInstance } from "class-transformer";
import { Transaction_ExportRepository } from "../repositories/transaction_export.repository";
import { Transaction_ExportModel, Transaction_ExportPaginationModel } from "../models/transaction_export.model";
import { CustomerService } from "./customer.service";
import { CustomerModel } from "../models/customer.model";
import { CreateTransaction_ExportDto } from "../dto/transaction_export/transaction_export.dto";

@Injectable()
export class Transaction_ExportService {
  constructor(
    private readonly transaction_exportRepository: Transaction_ExportRepository,
    private readonly customerService: CustomerService
  ) { }

  async search(dto): Promise<Transaction_ExportPaginationModel> {
    const models = await this.transaction_exportRepository.search(dto);
    return models
  }

  async create(dto: CreateTransaction_ExportDto): Promise<Transaction_ExportModel> {
    const customerExist = { 
      ...(await this.customerService.findByPhone(dto.phone)),
      ...dto
    }
    let customerModel = new CustomerModel();
    customerModel = await this.customerService.create(customerExist);

    const model: Transaction_ExportModel = plainToInstance(Transaction_ExportModel, {
      ...dto,
      user:dto.user_id,
      product:dto.product_id,
      customer:customerModel
    })
    return await this.transaction_exportRepository.save(model);
}

}