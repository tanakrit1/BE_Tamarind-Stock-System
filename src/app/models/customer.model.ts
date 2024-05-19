import { Type } from "class-transformer";
import { Customer } from "src/database/entities/customer.entity";

export class CustomerModel extends Customer { }

export class CustomerPaginationModel {
    @Type(() => CustomerModel)
    customers: CustomerModel[];
    totalItems: number;
}