import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/product.repositoy";
import { ProductModel, ProductPaginationModel } from "../models/product.model";
import { CreateProductDto, UpdateProductDto } from "../dto/product/product.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async findById(id: number): Promise<ProductModel> {
        return await this.productRepository.findById(id);
    }

    async search(dto): Promise<ProductPaginationModel> {
        const models = await this.productRepository.search(dto);
        return models
    }

    async create(dto: CreateProductDto): Promise<ProductModel> {
        const model: ProductModel = plainToInstance(ProductModel, dto as ProductModel)
        return await this.productRepository.save(model);
    }

    async update(dto: UpdateProductDto): Promise<ProductModel> {
        const model: ProductModel = plainToInstance(
            ProductModel,
          dto as ProductModel,
        );
        return await this.productRepository.save(model);
    }

    async delete(model: ProductModel): Promise<ProductModel> {
        return await this.productRepository.delete(model);
    }

}