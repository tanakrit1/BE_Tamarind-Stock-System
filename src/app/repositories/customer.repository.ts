import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/database/entities/customer.entity";
import { Repository } from "typeorm";
import { CustomerModel, CustomerPaginationModel } from "../models/customer.model";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CustomerRepository {
    constructor(
        @InjectRepository(Customer)
        private readonly repository: Repository<Customer>
    ) { }

    async findById(id: number): Promise<CustomerModel> {
        try {
            const supplier: CustomerModel = await this.repository.findOne({
                where: { id: id },
            });
            return supplier;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    
    async search(dto: any): Promise<CustomerPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('customer').select('customer');
            applyRepositorySortingModel(query, 'customer', dto);
            applyRepositoryQuickFilter(query, 'customer', dto.filterModel, []);
            applyRepositoryFilterModel(query, 'customer', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);

            const queryResult = await query.getManyAndCount();
            const [customers, count] = queryResult;
            return plainToInstance(CustomerPaginationModel, {
                customers: customers,
                totalItems: count,
            } as CustomerPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: CustomerModel): Promise<CustomerModel> {
        try {
            const entity: CustomerModel = this.repository.create(model);
            const saved: CustomerModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async delete(model: CustomerModel): Promise<CustomerModel> {
        try {
          const entity: CustomerModel = this.repository.create(model);
          const deleted: CustomerModel = await this.repository.softRemove(entity);
          return deleted;
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}