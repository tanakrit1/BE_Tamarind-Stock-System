import { Product } from "src/database/entities/product.entity";
import { PaginationDto } from "../base/base.dto";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class ProductDto extends Product { }

export class SearchProductDto extends PaginationDto {

}


export class CreateProductDto {

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'specialID ต้องมีความยาวไม่เกิน' })
    specialID: string;

    @IsOptional()
    @IsString()
    @MaxLength(64, { message: 'name ต้องมีความยาวไม่เกิน' })
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(32, { message: 'type ต้องมีความยาวไม่เกิน' })
    type: string;

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'price ต้องมีความยาวไม่เกิน' })
    price: string;
}