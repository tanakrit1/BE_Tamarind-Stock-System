import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Export_Deposit } from "src/database/entities/export_disposit.entity";
import { Repository } from "typeorm";
import { Export_DepositModel, Export_DepositPaginationModel } from "../models/export_deposit.model";
import { plainToInstance } from "class-transformer";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";

@Injectable()
export class Export_DepositRepository {
    constructor(
        @InjectRepository(Export_Deposit)
        private readonly repository: Repository<Export_Deposit>
    ) { }

    async search(dto: any): Promise<Export_DepositPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('export-deposit').select('export-deposit')
                .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.role'])
                .leftJoin('export-deposit.user', 'user')
                .leftJoinAndSelect('export-deposit.Import_Deposit', 'importDeposit')
                .leftJoinAndSelect('export-deposit.product', 'product')
                .leftJoinAndSelect('export-deposit.supplier', 'supplier')
            applyRepositorySortingModel(query, 'export-deposit', dto);
            applyRepositoryQuickFilter(query, 'export-deposit', dto.filterModel);
            applyRepositoryFilterModel(query, 'export-deposit', dto.filterModel);

            query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [export_deposits, count] = queryResult;
            return plainToInstance(Export_DepositPaginationModel, {
                export_deposits: export_deposits,
                totalItems: count,
            } as Export_DepositPaginationModel);
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
    async save(model: Export_DepositModel): Promise<Export_DepositModel> {
        try {
            const entity: Export_DepositModel = this.repository.create(model);
            const saved: Export_DepositModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}