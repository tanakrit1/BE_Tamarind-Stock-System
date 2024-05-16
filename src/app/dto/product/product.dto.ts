import { Product } from "src/database/entities/product.entity";
import { PaginationDto } from "../base/base.dto";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class ProductDto extends Product { }

export class SearchProductDto extends PaginationDto {

}


export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(8, { message: 'specialID ต้องมีความยาวไม่เกิน' })
    specialID: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(64, { message: 'name ต้องมีความยาวไม่เกิน' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(32, { message: 'type ต้องมีความยาวไม่เกิน' })
    type: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(8, { message: 'price ต้องมีความยาวไม่เกิน' })
    price: string;
}

export class UpdateProductDto {

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