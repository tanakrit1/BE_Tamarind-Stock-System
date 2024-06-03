import { Body, Controller, Post, Req } from "@nestjs/common";
import { Export_DepositService } from "../service/export_deposit.service";
import { CreateExport_DepositDto, SearchExport_DepositDto } from "../dto/export_deposit/export_deposit.dto";
import { Export_DepositPaginationVm, Export_DepositResponseVm } from "../view-model/export_deposit/export_deposit.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { Request } from "express";

@Controller('export_deposit')
export class Export_DepositController {
    constructor(
        private readonly export_depositService: Export_DepositService,
    ) { }

    @Post('search')
    async search(@Body() dto: SearchExport_DepositDto): Promise<Export_DepositPaginationVm> {
      try {
        const responses = await this.export_depositService.search(dto)
        const pagination: PaginationMetadataModel = {
          page: dto.page,
          perPage: dto.limit,
          totalItems: responses.totalItems,
        };
        return Export_DepositPaginationVm.convertToViewModel(responses, pagination)
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }
    
    @Post()
    async create(@Req() request: Request,@Body() dto: CreateExport_DepositDto): Promise<Export_DepositResponseVm> {
      try {
        const user_id = request.user['id']
        dto.user_id= Number(user_id)
        dto.exportDate= new Date()
        const created = await this.export_depositService.create(dto);
        return Export_DepositResponseVm.convertToViewModel(created);
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }    
}