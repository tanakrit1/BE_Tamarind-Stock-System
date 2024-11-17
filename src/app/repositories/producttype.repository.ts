import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductType } from "src/database/entities/producttype.entity";
import { Repository } from "typeorm";
import { ProductTypePaginationModel } from "../models/producttype.model";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductTypeRepository {
    constructor(
        @InjectRepository(ProductType)
        private readonly repository: Repository<ProductType>
    ) { }

    async search(dto: any): Promise<ProductTypePaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('producttype').select('producttype');
            applyRepositorySortingModel(query, 'producttype', dto);
            applyRepositoryQuickFilter(query, 'producttype', dto.filterModel, []);
            applyRepositoryFilterModel(query, 'producttype', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);

            const queryResult = await query.getManyAndCount();
            const [producttypes, count] = queryResult;
            return plainToInstance(ProductTypePaginationModel, {
                producttypes: producttypes,
                totalItems: count,
            } as ProductTypePaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

}