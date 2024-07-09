import { Type } from "class-transformer";
import { Export_Deposit } from "src/database/entities/export_disposit.entity";

export class Export_DepositModel extends Export_Deposit{ }

export class Export_DepositPaginationModel {
    @Type(() => Export_DepositModel)
    export_deposits: Export_DepositModel[];
    totalItems: number;
    sumquantity?: number;
}