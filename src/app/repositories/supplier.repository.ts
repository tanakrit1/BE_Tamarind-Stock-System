import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Supplier } from "src/database/entities/supplier.entity";
import { Repository } from "typeorm";
import { SupplierPaginationModel } from "../models/supplier.model";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { plainToInstance } from "class-transformer";

@Injectable()
export class SupplierRepository {
    constructor(
        @InjectRepository(Supplier)
        private readonly repository: Repository<Supplier>
    ) { }

    async search(dto: any): Promise<SupplierPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('supplier').select('supplier');
            applyRepositorySortingModel(query, 'supplier', dto);
            applyRepositoryQuickFilter(query, 'supplier', dto.filterModel, []);
            applyRepositoryFilterModel(query, 'supplier', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);

            const queryResult = await query.getManyAndCount();
            const [suppliers, count] = queryResult;
            return plainToInstance(SupplierPaginationModel, {
                suppliers: suppliers,
                totalItems: count,
            } as SupplierPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

}