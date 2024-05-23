import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction_ImportModel, Transaction_ImportPaginationModel } from "../models/transaction_import.model";
import { plainToInstance } from "class-transformer";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { Transaction_Export } from "src/database/entities/transaction_export.entity";
import { Transaction_ExportModel, Transaction_ExportPaginationModel } from "../models/transaction_export.model";

@Injectable()
export class Transaction_ExportRepository {
    constructor(
        @InjectRepository(Transaction_Export)
        private readonly repository: Repository<Transaction_Export>
    ) { }

    async search(dto: any): Promise<Transaction_ExportPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('transaction-export').select('transaction-export')
                .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.role'])
                .leftJoin('transaction-export.user', 'user')
                .leftJoinAndSelect('transaction-export.product', 'product')
                .leftJoinAndSelect('transaction-export.customer', 'customer')
            applyRepositorySortingModel(query, 'transaction-export', dto);
            applyRepositoryQuickFilter(query, 'transaction-export', dto.filterModel);
            applyRepositoryFilterModel(query, 'transaction-export', dto.filterModel);

            query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [transaction_exports, count] = queryResult;
            return plainToInstance(Transaction_ExportPaginationModel, {
                transaction_exports: transaction_exports,
                totalItems: count,
            } as Transaction_ExportPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: Transaction_ExportModel): Promise<Transaction_ExportModel> {
        try {
            const entity: Transaction_ExportModel = this.repository.create(model);
            const saved: Transaction_ExportModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}