import { Injectable } from "@nestjs/common";
import { SupplierRepository } from "../repositories/supplier.repository";
import { SupplierModel, SupplierPaginationModel } from "../models/supplier.model";
import { CreateSupplierDto, UpdateSupplierDto } from "../dto/supplier/supplier.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class SupplierService {
    constructor(
        private readonly supplierRepository: SupplierRepository
    ) { }

    async findById(id: number): Promise<SupplierModel> {
        return await this.supplierRepository.findById(id);
    }

    async findByPhone(phone: string): Promise<SupplierModel> {
        return await this.supplierRepository.findByPhone(phone);
    }

    async search(dto): Promise<SupplierPaginationModel> {
        const models = await this.supplierRepository.search(dto);
        return models
    }

    async create(dto: CreateSupplierDto): Promise<SupplierModel> {
        const model: SupplierModel = plainToInstance(SupplierModel, dto as SupplierModel)
        return await this.supplierRepository.save(model);
    }

    async update(dto: UpdateSupplierDto): Promise<SupplierModel> {
        const model: SupplierModel = plainToInstance(
            SupplierModel,
            dto as SupplierModel,
        );
        return await this.supplierRepository.save(model);
    }

    async delete(model: SupplierModel): Promise<SupplierModel> {
        return await this.supplierRepository.delete(model);
    }
}