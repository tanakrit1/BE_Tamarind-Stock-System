import { Body, Controller, Post } from "@nestjs/common";
import { Transaction_ImportService } from "../service/transaction_import.service";
import { SearchTransaction_ImportDto } from "../dto/transaction_import/transaction_import.dto";
import { Transaction_ImportPaginationVm } from "../view-model/transaction_import/transaction_import.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";

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
          totalItems: responses.totalItems,
        };
        return Transaction_ImportPaginationVm.convertToViewModel(responses, pagination)
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }
}