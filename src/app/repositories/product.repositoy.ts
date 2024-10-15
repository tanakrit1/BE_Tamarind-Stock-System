import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { Not, Repository } from "typeorm";
import { applyRepositoryFilterModel, applyRepositoryQuickFilter, applyRepositorySortingModel } from "../utils/repository.utils";
import { ProductModel, ProductPaginationModel } from "../models/product.model";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>
    ) { }

    async findById(id: number): Promise<ProductModel> {
        try {
            const product: ProductModel = await this.repository.findOne({
                where: { id: id },
            });
            return product;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }


    async findDuplicate(name: string, type: string): Promise<ProductModel> {
        try {
            const product: ProductModel = await this.repository.findOne({
                where: {
                    name: name,
                    type: type
                },
            });
            return product;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async findDuplicateUpdate(id:any,name: string, type: string): Promise<ProductModel> {
        try {
            const product: ProductModel = await this.repository.findOne({
                where: {
                    id:Not(id),
                    name: name,
                    type: type
                },
            });
            return product;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async search(dto: any): Promise<ProductPaginationModel> {
        try {
            const query = this.repository.createQueryBuilder('product').select('product');
            applyRepositorySortingModel(query, 'product', dto);
            applyRepositoryQuickFilter(query, 'product', dto.filterModel, []);
            applyRepositoryFilterModel(query, 'product', dto.filterModel);
            query.skip((dto.page - 1) * dto.limit).take(dto.limit);

            const queryResult = await query.getManyAndCount();
            const [products, count] = queryResult;
            return plainToInstance(ProductPaginationModel, {
                products: products,
                totalItems: count,
            } as ProductPaginationModel);
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(model: ProductModel): Promise<ProductModel> {
        try {
            const entity: ProductModel = this.repository.create(model);
            const saved: ProductModel = await this.repository.save(entity);
            return saved;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async delete(model: ProductModel): Promise<ProductModel> {
        try {
            const entity: ProductModel = this.repository.create(model);
            const deleted: ProductModel = await this.repository.softRemove(entity);
            return deleted;
        } catch (err) {
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}