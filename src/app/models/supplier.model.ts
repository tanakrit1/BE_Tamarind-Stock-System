import { Type } from "class-transformer";
import { Supplier } from "src/database/entities/supplier.entity";

export class SupplierModel extends Supplier { }

export class SupplierPaginationModel {
    @Type(() => SupplierModel)
    suppliers: SupplierModel[];
    totalItems: number;
}