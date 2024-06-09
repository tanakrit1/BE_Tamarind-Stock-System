import { Type } from "class-transformer";


export class ReportModel { }

export class ReportPaginationModel {
    @Type(() => ReportModel)
    reports: ReportModel[];
    totalItems: number;
}