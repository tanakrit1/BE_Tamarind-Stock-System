import { Injectable, NotFoundException } from "@nestjs/common";
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

    async findDuplicate(name:string,type:string): Promise<ProductModel> {
        return await this.productRepository.findDuplicate(name,type);
    }

    async findDuplicateUpdate(id:any,name:string,type:string): Promise<ProductModel> {
        return await this.productRepository.findDuplicateUpdate(id,name,type);
    }

    async search(dto): Promise<ProductPaginationModel> {
        const models = await this.productRepository.search(dto);
        return models
    }

    async create(dto: CreateProductDto): Promise<ProductModel> {
        const check = await this.findDuplicate(dto.name,dto.type)
        if(check){
            throw new NotFoundException([`สินค้านี้มีอยู่เเล้ว ${dto.name} ประเภท ${dto.type}`]);
        }
        const model: ProductModel = plainToInstance(ProductModel, {
            ...dto,
            ProductTypes:dto?.productType_Id
        })
        return await this.productRepository.save(model);
    }

    async update(dto: UpdateProductDto): Promise<ProductModel> {
        const check = await this.findDuplicateUpdate(dto['id'],dto.name,dto.type)
        if(check){
            throw new NotFoundException([`สินค้านี้มีอยู่เเล้ว ${dto.name} ประเภท ${dto.type}`]);
        }
        const model: ProductModel = plainToInstance(ProductModel, {
            ...dto,
            ProductTypes:dto?.productType_Id
        })
        return await this.productRepository.save(model);
    }

    async delete(model: ProductModel): Promise<ProductModel> {
        return await this.productRepository.delete(model);
    }

}