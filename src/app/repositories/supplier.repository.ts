import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Supplier } from "src/database/entities/supplier.entity";
import { Repository } from "typeorm";
import { SupplierModel, SupplierPaginationModel } from "../models/supplier.model";
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

    async save(model: SupplierModel): Promise<SupplierModel> {
        try {
            const entity: SupplierModel = this.repository.create(model);
            const saved: SupplierModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

}