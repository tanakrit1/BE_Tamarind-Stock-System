import { Body, Controller, Post, Req } from "@nestjs/common";
import { Transaction_ImportService } from "../service/transaction_import.service";
import { CreateTransaction_ImportDto, SearchTransaction_ImportDto } from "../dto/transaction_import/transaction_import.dto";
import { Transaction_ImportPaginationVm, Transaction_ImportResponseVm } from "../view-model/transaction_import/transaction_import.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { Request } from "express";

@Controller('transaction_import')
export class Transaction_ImportController {
    constructor(
        private readonly transaction_importService: Transaction_ImportService,
    ) { }

    @Post('search')
    async search(@Body() dto: SearchTransaction_ImportDto): Promise<Transaction_ImportPaginationVm> {
      try {
        const responses = await this.transaction_importService.search(dto)
        const pagination: PaginationMetadataModel = {
          page: dto.page,
          perPage: dto.limit,
          sumquantity:responses.sumquantity,
          totalItems: responses.totalItems,
        };
        return Transaction_ImportPaginationVm.convertToViewModel(responses, pagination)
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }

    @Post()
    async create(@Req() request: Request,@Body() dto: CreateTransaction_ImportDto): Promise<Transaction_ImportResponseVm> {
      try {
        const user_id = request.user['id']
        dto.user_id= Number(user_id)
        dto.importDate= new Date()
        const created = await this.transaction_importService.create(dto);
        return Transaction_ImportResponseVm.convertToViewModel(created);
      } catch (err) {
        throw HandleErrorException(err);
      }
    }
  
}