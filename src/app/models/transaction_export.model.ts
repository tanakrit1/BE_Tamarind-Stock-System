import { Type } from "class-transformer";
import { Transaction_Export } from "src/database/entities/transaction_export.entity";

export class Transaction_ExportModel extends Transaction_Export { }

export class Transaction_ExportPaginationModel {
    @Type(() => Transaction_ExportModel)
    transaction_exports: Transaction_ExportModel[];
    totalItems: number;
    sumquantity?: number;
}