import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../base/base.dto";

export class SearchUserDto extends PaginationDto {
  @IsOptional()
  @IsString()
  employeeID: string;
}