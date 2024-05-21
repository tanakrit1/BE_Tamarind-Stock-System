import { Transaction_Import } from "src/database/entities/transaction_import.entity";
import { PaginationDto } from "../base/base.dto";

export class Transaction_ImportDto extends Transaction_Import { }

export class SearchTransaction_ImportDto extends PaginationDto {
    
  }