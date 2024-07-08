import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Import_Deposit } from "src/database/entities/import_deposit.entity";
import { Repository } from "typeorm";
import { Import_DepositModel, Import_DepositPaginationModel } from "../models/import_deposit.model";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { plainToInstance } from "class-transformer";

@Injectable()
export class Import_DepositRepository {
    constructor(
        @InjectRepository(Import_Deposit)
        private readonly repository: Repository<Import_Deposit>
    ) { }

    async findById(id: number): Promise<Import_DepositModel> {
        try {
          const Import_Deposit: Import_DepositModel = await this.repository.findOne({
            where: { id: id },
          });
          return Import_Deposit;
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
      }

    async search(dto: any): Promise<Import_DepositPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('import-deposit').select('import-deposit')
                .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.role'])
                .leftJoin('import-deposit.user', 'user')
                .leftJoinAndSelect('import-deposit.Export_Deposits', 'exportDeposit')
                .leftJoinAndSelect('import-deposit.product', 'product')
                .leftJoinAndSelect('import-deposit.supplier', 'supplier')
            applyRepositorySortingModel(query, 'import-deposit', dto);
            applyRepositoryQuickFilter(query, 'import-deposit', dto.filterModel);
            applyRepositoryFilterModel(query, 'import-deposit', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);
            const queryResult = await query.getManyAndCount();
            const [Import_deposits, count] = queryResult;

            const sumQuery = this.repository.createQueryBuilder('import-deposit')
            .select('import-deposit.id', 'import-deposit_id')
            .addSelect('import-deposit.quantity', 'import_deposit_quantity')
            .leftJoin('import-deposit.user', 'user')
            .leftJoin('import-deposit.Export_Deposits', 'exportDeposit')
            .leftJoin('import-deposit.product', 'product')
            .leftJoin('import-deposit.supplier', 'supplier');
          applyRepositoryQuickFilter(sumQuery, 'import-deposit', dto.filterModel);
          applyRepositoryFilterModel(sumQuery, 'import-deposit', dto.filterModel);
           sumQuery.groupBy('import-deposit.id')
           const sumQuantityResult = await sumQuery.getRawMany();
           const sumquantity = sumQuantityResult.reduce((total, item) => total + parseFloat(item.import_deposit_quantity||0), 0);
        
            return plainToInstance(Import_DepositPaginationModel, {
                Import_deposits: Import_deposits,
                totalItems: count,
                sumquantity:sumquantity
            } as Import_DepositPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: Import_DepositModel): Promise<Import_DepositModel> {
        try {
            const entity: Import_DepositModel = this.repository.create(model);
            const saved: Import_DepositModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}