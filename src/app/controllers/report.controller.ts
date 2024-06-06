import { Body, Controller, Post } from "@nestjs/common";
import { ReportService } from "../service/report.service";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { ReportResponseVm } from "../view-model/report/report.vm";

@Controller('report')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
    ) { }

    @Post('reportstock')
    async reportstock(
        @Body() req,
    ) {
        try {
            const reported = await this.reportService.reportstock(req);
            return ReportResponseVm.convertToViewModel(reported);
        } catch (err) {
            throw HandleErrorException(err);
        }
    }
}