import { Type } from "class-transformer";
import { Product } from "src/database/entities/product.entity";

export class ProductModel extends Product { }

export class ProductPaginationModel {
    @Type(() => ProductModel)
    products: ProductModel[];
    totalItems: number;
}