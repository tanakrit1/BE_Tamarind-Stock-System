import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { CreateProductDto, SearchProductDto, UpdateProductDto } from "../dto/product/product.dto";
import { PaginationMetadataModel } from "../models/base.model";
import { ProductPaginationVm, ProductResponseVm } from "../view-model/product/product.vm";
import { NotFoundException } from "../exceptions/not-found.exception";
import { ProductModel } from "../models/product.model";
import { plainToInstance } from "class-transformer";

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

  @Patch('/:id')
  async update(
    @Param('id') parametersId: number,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseVm> {
    try {
      const productId = Number(parametersId);
      const product = await this.productService.findById(productId);
      if (!product) {
        throw new NotFoundException(
          { field: 'id', value: parametersId },
          `ไม่พบข้อมูลของ product ID ${parametersId}`,
        );
      }
      const updateDto: ProductModel = plainToInstance(ProductModel, {
        ...product,
        ...dto
      })
      const updated: ProductModel = await this.productService.update(updateDto)
      return ProductResponseVm.convertToViewModel(updated)
    } catch (err) {
      throw HandleErrorException(err)
    }
  }

  @Delete('/:id')
  async delete(@Param('id') parametersId: number): Promise<ProductResponseVm> {
    try {
      const productId = Number(parametersId);
      const product = await this.productService.findById(productId);
      if (!product) {
        throw new NotFoundException(
          { field: 'id', value: parametersId },
          `ไม่พบข้อมูลของ product ID ${parametersId}`,
        );
      }
      const deleted: ProductModel = await this.productService.delete(product);
      return ProductResponseVm.convertToViewModel(deleted);
    } catch (err) {
      throw HandleErrorException(err);
    }
  }


}