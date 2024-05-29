import { Import_Deposit } from "src/database/entities/import_deposit.entity";
import { PaginationDto } from "../base/base.dto";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class Import_DepositDto extends Import_Deposit { }

export class SearchImport_DepositDto extends PaginationDto {

}

export class CreateImport_DepositDto {

    @IsOptional()
    @IsNumber()
    user_id: number;
  
    @IsOptional()
    @IsString()
    @MaxLength(16, { message: 'quantity ต้องมีความยาวไม่เกิน' })
    quantity: string;
  
    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @Transform(({ value }: TransformFnParams) => new Date(value))
    @IsDate({message:'periodDate ต้องเป็นวันที่'})
    periodDate: Date;
  
    @IsOptional()
    @IsDate({message:'importDate ต้องเป็นวันที่'})
    importDate: Date;
    //-------------------------------------------------------------------//
    @IsNotEmpty()
    @IsNumber()
    product_id: number;
    //-------------------------------------------------------------------//
  
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