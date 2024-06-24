import { Body, Controller, Post } from "@nestjs/common";
import { ReportService } from "../service/report.service";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { ReportPaginationVm, ReportResponseVm } from "../view-model/report/report.vm";
import { PaginationMetadataModel } from "../models/base.model";

@Controller('report')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
    ) { }

    @Post('checkStock')
    async checkStock(
        @Body() req,
    ) {
        try {
            const reported = await this.reportService.checkStock(req);
            return ReportResponseVm.convertToViewModel(reported);
        } catch (err) {
            throw HandleErrorException(err);
        }
    }

    @Post('reportstock')
    async reportstock(
        @Body() req,
    ) {
        try {
            const reported = await this.reportService.reportstock(req);
            const pagination: PaginationMetadataModel = {
                page: req.page,
                perPage: req.limit,
                totalItems: reported.totalItems,
            };
            return ReportPaginationVm.convertToViewModel(reported, pagination)
        } catch (err) {
            throw HandleErrorException(err);
        }
    }

    @Post('dashboard')
    async dashboard( 
        @Body() req,
    ){
        try{
            req.page = 1
            req.limit = 9999
            const reported = await this.reportService.stockDashBoard(req);
            let data = {
                remaining: reported?.reports,
                productsToDeliverToday:[]
            }
            return ReportResponseVm.convertToViewModel(data) 

        }catch(err){
            throw HandleErrorException(err);
        }
    }
        
}