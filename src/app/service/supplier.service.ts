import { Injectable } from "@nestjs/common";
import { SupplierRepository } from "../repositories/supplier.repository";
import { SupplierPaginationModel } from "../models/supplier.model";

@Injectable()
export class SupplierService {
    constructor(
        private readonly supplierRepository: SupplierRepository
    ) { }

    async search(dto): Promise<SupplierPaginationModel> {
        const models = await this.supplierRepository.search(dto);
        return models
    }
}