import { Body, Controller, Post } from "@nestjs/common";
import { SupplierService } from "../service/supplier.service";
import { SearchSupplierDto } from "../dto/supplier/supplier.dto";
import { SupplierPaginationVm } from "../view-model/supplier/supplier.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";

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
}