import { Type } from "class-transformer";
import { ProductType } from "src/database/entities/producttype.entity";

export class ProductTypeModel extends ProductType { }

export class ProductTypePaginationModel {
    @Type(() => ProductTypeModel)
    producttypes: ProductTypeModel[];
    totalItems: number;
}