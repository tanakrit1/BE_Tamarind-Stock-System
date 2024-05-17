import { Supplier } from "src/database/entities/supplier.entity";
import { PaginationDto } from "../base/base.dto";

export class SupplierDto extends Supplier { }

export class SearchSupplierDto extends PaginationDto {

}
