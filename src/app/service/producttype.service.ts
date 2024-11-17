import { Injectable } from "@nestjs/common";
import { ProductTypeRepository } from "../repositories/producttype.repository";
import { ProductTypePaginationModel } from "../models/producttype.model";

@Injectable()
export class ProductTypeService {
    constructor(
        private readonly producttypeRepository: ProductTypeRepository
    ) { }

    async search(dto): Promise<ProductTypePaginationModel> {
        const models = await this.producttypeRepository.search(dto);
        return models
    }
}