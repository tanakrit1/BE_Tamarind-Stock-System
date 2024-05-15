import { Body, Controller, Post } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { CreateProductDto, SearchProductDto } from "../dto/product/product.dto";
import { PaginationMetadataModel } from "../models/base.model";
import { ProductPaginationVm, ProductResponseVm } from "../view-model/product/product.vm";

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) { }

  
  @Post('search')
  async search(@Body() dto: SearchProductDto): Promise<ProductPaginationVm> {
    try {
      const responses = await this.productService.search(dto)
      const pagination: PaginationMetadataModel = {
        page: dto.page,
        perPage: dto.limit,
        totalItems: responses.totalItems,
      };
      return ProductPaginationVm.convertToViewModel(responses, pagination)
    } catch (err) {
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseVm> {
    try {
      const created = await this.productService.create(dto);
      return ProductResponseVm.convertToViewModel(created);
    } catch (err) {
      throw HandleErrorException(err);
    }
  }

}