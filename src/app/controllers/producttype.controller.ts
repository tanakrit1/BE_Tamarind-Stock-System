import { Body, Controller, Post } from "@nestjs/common";
import { ProductTypeService } from "../service/producttype.service";
import { SearchProductTypeDto } from "../dto/producttype/producttype.dto";
import { ProductTypePaginationVm } from "../view-model/producttype/producttype.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";

@Controller('producttype')
export class ProductTypeController {
    constructor(
        private readonly producttypeService: ProductTypeService
    ) { }

    @Post('search')
    async search(@Body() dto: SearchProductTypeDto): Promise<ProductTypePaginationVm> {
        try {
            const responses = await this.producttypeService.search(dto)
            const pagination: PaginationMetadataModel = {
                page: dto.page,
                perPage: dto.limit,
                totalItems: responses.totalItems,
            };
            return ProductTypePaginationVm.convertToViewModel(responses, pagination)
        } catch (err) {
            console.log(err)
            throw HandleErrorException(err);
        }
    }

}