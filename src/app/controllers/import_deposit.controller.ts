import { Body, Controller, Param, Patch, Post, Req } from "@nestjs/common";
import { Import_DepositService } from "../service/import_deposit.service";
import { CreateImport_DepositDto, SearchImport_DepositDto, UpdateImport_DepositDto } from "../dto/import_deposit/import_deposit.dto";
import { Import_DepositPaginationVm, Import_DepositResponseVm } from "../view-model/import_deposit/import_deposit.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { Request } from "express";
import { NotFoundException } from "../exceptions/not-found.exception";
import { plainToInstance } from "class-transformer";
import { Import_DepositModel } from "../models/import_deposit.model";

@Controller('import_deposit')
export class Import_DepositController {
    constructor(
        private readonly import_depositService: Import_DepositService,
    ) { }

    @Post('search')
    async search(@Body() dto: SearchImport_DepositDto): Promise<Import_DepositPaginationVm> {
      try {
        const responses = await this.import_depositService.search(dto)
        const pagination: PaginationMetadataModel = {
          page: dto.page,
          perPage: dto.limit,
          totalItems: responses.totalItems,
        };
        return Import_DepositPaginationVm.convertToViewModel(responses, pagination)
      } catch (err) {
        console.log(err)
        throw HandleErrorException(err);
      }
    }

    @Patch('/:id')
    async update(
      @Param('id') parametersId: number,
      @Body() dto: UpdateImport_DepositDto,
    ): Promise<Import_DepositResponseVm> {
      try {
        const impoer_dispositId = Number(parametersId);
        const impoer_disposit = await this.import_depositService.findById(impoer_dispositId);
        if (!impoer_disposit) {
          throw new NotFoundException(
            { field: 'id', value: parametersId },
            `ไม่พบข้อมูลของ Import_Deposit ID ${parametersId}`,
          );
        }
        const UpdateDto: Import_DepositModel = plainToInstance(Import_DepositModel, {
          ...impoer_disposit,
          ...dto,
        } as Import_DepositModel);
        const updated: Import_DepositModel = await this.import_depositService.update(UpdateDto);
        return Import_DepositResponseVm.convertToViewModel(updated);
      } catch (err) {
        throw HandleErrorException(err);
      }
    }

    @Post()
    async create(@Req() request: Request,@Body() dto: CreateImport_DepositDto): Promise<Import_DepositResponseVm> {
      try {
        const user_id = request.user['id']
        dto.user_id= Number(user_id)
        dto.importDate= new Date()
        const created = await this.import_depositService.create(dto);
        return Import_DepositResponseVm.convertToViewModel(created);
      } catch (err) {
        throw HandleErrorException(err);
      }
    }    
}