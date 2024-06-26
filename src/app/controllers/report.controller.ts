import { Body, Controller, Post } from "@nestjs/common";
import { ReportService } from "../service/report.service";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { ReportPaginationVm, ReportResponseVm } from "../view-model/report/report.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { omit, sumBy } from "lodash";

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
            const reported1= await this.reportService.stockDashBoard(req);
            const reported2 = await this.reportService.productExportToday(req);
            const saleDashBoard = await this.reportService.saleDashBoard(req);
            const reportsWithNumbers = saleDashBoard.reports.map(report => ({
                saleToday: Number(report['saleToday']),
                saleMonth: Number(report['saleMonth']),
                totalCustomerMonth: Number(report['totalCustomerMonth'])
            }));
            let data = {
                remaining: reported1?.reports,
                productsToDeliverToday:reported2?.reports,
                saleToday: sumBy(reportsWithNumbers, 'saleToday'),
                saleMonth:sumBy(reportsWithNumbers, 'saleMonth'),
                totalCustomerMonth:sumBy(reportsWithNumbers, 'totalCustomerMonth')
            }
            return ReportResponseVm.convertToViewModel(data) 

        }catch(err){
            throw HandleErrorException(err);
        }
    }
        
}