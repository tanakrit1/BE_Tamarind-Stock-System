import { Type } from "class-transformer";
import { Import_Deposit } from "src/database/entities/import_deposit.entity";

export class Import_DepositModel extends Import_Deposit { }

export class Import_DepositPaginationModel {
    @Type(() => Import_DepositModel)
    Import_deposits: Import_DepositModel[];
    totalItems: number;
    sumquantity?: number;
}