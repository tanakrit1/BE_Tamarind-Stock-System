import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction_Import } from "src/database/entities/transaction_import.entity";
import { Repository } from "typeorm";
import { Transaction_ImportModel, Transaction_ImportPaginationModel } from "../models/transaction_import.model";
import { plainToInstance } from "class-transformer";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";

@Injectable()
export class Transaction_ImportRepository {
    constructor(
        @InjectRepository(Transaction_Import)
        private readonly repository: Repository<Transaction_Import>
    ) { }

    async search(dto: any): Promise<Transaction_ImportPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('transaction-import').select('transaction-import')
                .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.role'])
                .leftJoin('transaction-import.user', 'user')
                .leftJoinAndSelect('transaction-import.product', 'product')
                .leftJoinAndSelect('transaction-import.supplier', 'supplier')
            applyRepositorySortingModel(query, 'transaction-import', dto);
            applyRepositoryQuickFilter(query, 'transaction-import', dto.filterModel);
            applyRepositoryFilterModel(query, 'transaction-import', dto.filterModel);

            query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [transaction_imports, count] = queryResult;
            return plainToInstance(Transaction_ImportPaginationModel, {
                transaction_imports: transaction_imports,
                totalItems: count,
            } as Transaction_ImportPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: Transaction_ImportModel): Promise<Transaction_ImportModel> {
        try {
            const entity: Transaction_ImportModel = this.repository.create(model);
            const saved: Transaction_ImportModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}