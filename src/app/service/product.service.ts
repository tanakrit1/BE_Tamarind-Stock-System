import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/product.repositoy";
import { ProductModel, ProductPaginationModel } from "../models/product.model";
import { CreateProductDto } from "../dto/product/product.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async search(dto): Promise<ProductPaginationModel> {
        const models = await this.productRepository.search(dto);
        return models
    }

    async create(dto: CreateProductDto): Promise<ProductModel> {
        const model: ProductModel = plainToInstance(ProductModel, dto as ProductModel)
        return await this.productRepository.save(model);
    }

}