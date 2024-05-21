import { Type } from "class-transformer";
import { Transaction_Import } from "src/database/entities/transaction_import.entity";

export class Transaction_ImportModel extends Transaction_Import { }

export class Transaction_ImportPaginationModel {
    @Type(() => Transaction_ImportModel)
    transaction_imports: Transaction_ImportModel[];
    totalItems: number;
}