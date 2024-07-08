import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Transaction_ImportModel } from "../models/transaction_import.model";
import { plainToInstance } from "class-transformer";
import { Transaction_ExportRepository } from "../repositories/transaction_export.repository";
import { Transaction_ExportModel, Transaction_ExportPaginationModel } from "../models/transaction_export.model";
import { CustomerService } from "./customer.service";
import { CustomerModel } from "../models/customer.model";
import { CreateTransaction_ExportDto } from "../dto/transaction_export/transaction_export.dto";
import { ReportService } from "./report.service";
import { BadRequestException } from "../exceptions/bad-request.exception";

@Injectable()
export class Transaction_ExportService {
  constructor(
    private readonly transaction_exportRepository: Transaction_ExportRepository,
    private readonly customerService: CustomerService,
    @Inject(forwardRef(() => ReportService))
    private readonly reportService: ReportService
  ) { }

  async search(dto): Promise<Transaction_ExportPaginationModel> {
    const models = await this.transaction_exportRepository.search(dto);
    return models
  }

  async create(dto: CreateTransaction_ExportDto): Promise<Transaction_ExportModel> {
    let checkStock = await this.reportService.checkStock({ product_id: dto.product_id })
    if (checkStock.length > 0) {
      if (checkStock[0].remaining_ซื้อขาย_แปรรูป < Number(dto.quantity)) {
        let { specialID, name, remaining_ซื้อขาย_แปรรูป } = checkStock[0]
        throw new BadRequestException(null, [`จำนวนคงเหลือ ${name} ${specialID} ไม่เพียงพอ: คงเหลือ ${remaining_ซื้อขาย_แปรรูป} `])
      }
    }
  //-------------ถ้ามีอยู่เเล้วให้นำที่อยู่ที่ส่งมา บันทึกลง transation_export ----------//
    let model= new Transaction_ExportModel()
    const customerExist = {
      ...(await this.customerService.findByPhone(dto.phone)),
      ...dto
    }

    let customerModel = new CustomerModel();
    if(customerExist.id){
      model = plainToInstance(Transaction_ExportModel, {
        ...dto,
        shipAddress:dto.address,
        shipSubDistrict:dto.subDistric,
        shipDistrict:dto.distric,
        shipProvince:dto.province,
        shipZipCode:dto.zipCode,
        user: dto.user_id,
        product: dto.product_id,
        customer: customerExist.id
      })
    }else{
      customerModel = await this.customerService.create(customerExist);
      model = plainToInstance(Transaction_ExportModel, {
        ...dto,
        shipAddress:dto.address,
        shipSubDistrict:dto.subDistric,
        shipDistrict:dto.distric,
        shipProvince:dto.province,
        shipZipCode:dto.zipCode,
        user: dto.user_id,
        product: dto.product_id,
        customer: customerModel
      })
    }
    return await this.transaction_exportRepository.save(model);
  }

}