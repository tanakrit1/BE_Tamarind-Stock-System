import { ProductType } from "src/database/entities/producttype.entity";
import { PaginationDto } from "../base/base.dto";

export class ProductTypeDto extends ProductType { }

export class SearchProductTypeDto extends PaginationDto {

}