import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { SupplierService } from "../service/supplier.service";
import { CreateSupplierDto, SearchSupplierDto, UpdateSupplierDto } from "../dto/supplier/supplier.dto";
import { SupplierPaginationVm, SupplierResponseVm } from "../view-model/supplier/supplier.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { plainToInstance } from "class-transformer";
import { SupplierModel } from "../models/supplier.model";

@Controller('supplier')
export class SupplierController {
  constructor(
    private readonly supplierService: SupplierService
  ) { }

  @Post('search')
  async search(@Body() dto: SearchSupplierDto): Promise<SupplierPaginationVm> {
    try {
      const responses = await this.supplierService.search(dto)
      const pagination: PaginationMetadataModel = {
        page: dto.page,
        perPage: dto.limit,
        totalItems: responses.totalItems,
      };
      return SupplierPaginationVm.convertToViewModel(responses, pagination)
    } catch (err) {
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  
  @Post()
  async create(@Body() dto: CreateSupplierDto): Promise<SupplierResponseVm> {
    try {
      const created = await this.supplierService.create(dto);
      return SupplierResponseVm.convertToViewModel(created);
    } catch (err) {
      throw HandleErrorException(err);
    }
  }

  @Patch('/:id')
  async update(
    @Param('id') parametersId: number,
    @Body() dto: UpdateSupplierDto,
  ): Promise<SupplierResponseVm> {
    try {
      const supplierId = Number(parametersId);
      const supplier = await this.supplierService.findById(supplierId);
      if (!supplier) {
        throw new NotFoundException(
          { field: 'id', value: parametersId },
          `ไม่พบข้อมูลของ supplier ID ${parametersId}`,
        );
      }
      const updateDto: SupplierModel = plainToInstance(SupplierModel, {
        ...supplier,
        ...dto
      })
      const updated: SupplierModel = await this.supplierService.update(updateDto)
      return SupplierResponseVm.convertToViewModel(updated)
    } catch (err) {
      throw HandleErrorException(err)
    }
  }

  @Delete('/:id')
  async delete(@Param('id') parametersId: number): Promise<SupplierResponseVm> {
    try {
        const supplierId = Number(parametersId);
        const supplier = await this.supplierService.findById(supplierId);
        if (!supplier) {
          throw new NotFoundException(
            { field: 'id', value: parametersId },
            `ไม่พบข้อมูลของ supplier ID ${parametersId}`,
          );
        }
      const deleted: SupplierModel = await this.supplierService.delete(supplier);
      return SupplierResponseVm.convertToViewModel(deleted);
    } catch (err) {
      throw HandleErrorException(err);
    }
  }

}