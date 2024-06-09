import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { ReportModel, ReportPaginationModel } from "src/app/models/report.model";
import { PaginationMetadataModel } from "src/app/models/base.model";

export class ReportPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => ReportModel)
    data: ReportModel[];

    static convertToViewModel(
        pagination: ReportPaginationModel,
        metadata: PaginationMetadataModel,
    ): ReportPaginationVm {
        return plainToInstance(ReportPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.reports.map(
                (report) => ReportResponseVm.convertToViewModel(report).data,
            ),
        } as ReportPaginationVm);
    }
}

export class ReportResponseVm extends ResponseVm {
    data: ReportModel;
    static convertToViewModel(response): ReportResponseVm {
        try {
            return plainToInstance(ReportResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as ReportResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}