
import { PaginationDto } from "../base/base.dto";
import { User } from "src/database/entities/user.entity";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';


export class UserDto extends User { }

export class SearchUserDto extends PaginationDto {
  @IsOptional()
  @IsString()
  employeeID: string;
}




export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @MaxLength(8, {message:'employeeID ต้องมีความยาวไม่เกิน 8 ตัวอักษร'
  })
  employeeID: string;


  @IsNotEmpty()
  @IsString()
  @MaxLength(16, {message:'username ต้องมีความยาวไม่เกิน 16 ตัวอักษร'})
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword(
    { minLength: 12 },
    {
      message:
        'รหัสผ่าน ต้องความยาวไม่น้อยกว่า 12 ตัวอักษร และประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ',
    },
  )
  password: string;


  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {message:'firstName ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
  firstName: string;


  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {message:'lastName ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
  lastName: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}

export class UpdateUserDto {
  id: number;
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(8, {message:'employeeID ต้องมีความยาวไม่เกิน 8 ตัวอักษร'
  })
  employeeID: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword(
    { minLength: 12 },
    {
      message:
        'รหัสผ่าน ต้องความยาวไม่น้อยกว่า 12 ตัวอักษร และประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ',
    },
  )
  password: string;


  @IsOptional()
  @IsString()
  @MaxLength(50, {message:'firstName ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
  firstName: string;


  @IsOptional()
  @IsString()
  @MaxLength(50, {message:'lastName ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
  lastName: string;

  @IsOptional()
  @IsString()
  role: string;
}

