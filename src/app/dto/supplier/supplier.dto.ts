import { Supplier } from "src/database/entities/supplier.entity";
import { PaginationDto } from "../base/base.dto";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class SupplierDto extends Supplier { }

export class SearchSupplierDto extends PaginationDto {

}

export class CreateSupplierDto {

    @IsOptional()
    @IsString()
    @MaxLength(8, { message: 'specialID ต้องมีความยาวไม่เกิน' })
    specialID: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(64, { message: 'firstName ต้องมีความยาวไม่เกิน' })
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(64, { message: 'lastName ต้องมีความยาวไม่เกิน' })
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(64, { message: 'address ต้องมีความยาวไม่เกิน' })
    address: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(64, { message: 'subDistric ต้องมีความยาวไม่เกิน' })
    subDistric: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(64, { message: 'distric ต้องมีความยาวไม่เกิน' })
    distric: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(64, { message: 'province ต้องมีความยาวไม่เกิน' })
    province: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(8, { message: 'zipCode ต้องมีความยาวไม่เกิน' })
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(16, { message: 'phone ต้องมีความยาวไม่เกิน' })
    phone: string;
}