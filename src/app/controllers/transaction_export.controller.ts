import { Body, Controller, Post, Req } from "@nestjs/common";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { Request } from "express";
import { Transaction_ExportService } from "../service/transaction_export.service";
import { CreateTransaction_ExportDto, SearchTransaction_ExportDto } from "../dto/transaction_export/transaction_export.dto";
import { Transaction_ExportPaginationVm, Transaction_ExportResponseVm } from "../view-model/transaction_export/transaction_export.vm";

@Controller('transaction_export')
export class Transaction_ExportController {
    constructor(
        private readonly transaction_exportService: Transaction_ExportService,
    ) { }

    @Post('search')
    async search(@Body() dto: SearchTransaction_ExportDto): Promise<Transaction_ExportPaginationVm> {
      try {
        const responses = await this.transaction_exportService.search(dto)
        const pagination: PaginationMetadataModel = {
          page: dto.page,
          perPage: dto.limit,
          totalItems: responses.totalItems,
        };
        return Transaction_ExportPaginationVm.convertToViewModel(responses, pagination)
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }

    @Post()
    async create(@Req() request: Request,@Body() dto: CreateTransaction_ExportDto): Promise<Transaction_ExportResponseVm> {
      try {
        const user_id = request.user['id']
        dto.user_id= Number(user_id)
        dto.exportDate=new Date()
        const created = await this.transaction_exportService.create(dto);
        return Transaction_ExportResponseVm.convertToViewModel(created);
      } catch (err) {
        throw HandleErrorException(err);
      }
    }
  
}