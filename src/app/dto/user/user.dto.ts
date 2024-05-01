import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../base/base.dto";
import { User } from "src/database/entities/user.entity";

export class SearchUserDto extends PaginationDto {
  @IsOptional()
  @IsString()
  employeeID: string;
}

export class UserDto extends User { }