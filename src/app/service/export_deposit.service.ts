import { Injectable } from "@nestjs/common";
import { Export_DepositRepository } from "../repositories/export_deposit.repository";
import { SupplierService } from "./supplier.service";
import { Export_DepositModel, Export_DepositPaginationModel } from "../models/export_deposit.model";
import { CreateExport_DepositDto } from "../dto/export_deposit/export_deposit.dto";
import { SupplierModel } from "../models/supplier.model";
import { plainToInstance } from "class-transformer";
import { Import_DepositService } from "./import_deposit.service";
import { Import_DepositModel } from "../models/import_deposit.model";

@Injectable()
export class Export_DepositService {
    constructor(
        private readonly export_depositRepository: Export_DepositRepository,
        private readonly supplierService: SupplierService,
        private readonly import_depositService:Import_DepositService
    ) { }

    async search(dto): Promise<Export_DepositPaginationModel> {
        const models = await this.export_depositRepository.search(dto);
        return models
    }

    async create(dto: CreateExport_DepositDto): Promise<Export_DepositModel> {
        const supplierExist = { 
          ...(await this.supplierService.findByPhone(dto.phone)),
          ...dto
        }
        let supplierModel = new SupplierModel();
        supplierModel = await this.supplierService.create(supplierExist);

        const model: Export_DepositModel = plainToInstance(Export_DepositModel, {
          ...dto,
          user:dto.user_id,
          product:dto.product_id,
          supplier:supplierModel,
          Import_Deposit:dto.Import_Deposit_id
        })

        let import_depositExist = await this.import_depositService.findById(dto.Import_Deposit_id)
        let updateImport_Desposit = await this.import_depositService.update(
          plainToInstance(Import_DepositModel, {
           id:import_depositExist.id,
           remain:Number(import_depositExist.remain)-Number(dto.quantity)
        }))
        console.log('updateImport_Desposit',updateImport_Desposit)
        
        return await this.export_depositRepository.save(model);
    }

}