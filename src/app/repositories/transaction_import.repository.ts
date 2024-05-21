import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction_Import } from "src/database/entities/transaction_import.entity";
import { Repository } from "typeorm";
import { Transaction_ImportPaginationModel } from "../models/transaction_import.model";
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
            const query = this.repository.createQueryBuilder('transaction_import').select('transaction_import')
                .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.role'])
                .leftJoin('transaction_import.user', 'user')
                .leftJoinAndSelect('transaction_import.product', 'product')
                .leftJoinAndSelect('transaction_import.supplier', 'supplier')
            applyRepositorySortingModel(query, 'transaction_import', dto);
            applyRepositoryQuickFilter(query, 'transaction_import', dto.filterModel);
            applyRepositoryFilterModel(query, 'transaction_import', dto.filterModel);

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
}