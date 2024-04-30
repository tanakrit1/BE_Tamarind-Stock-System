import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FilterModelItemOperationEnum } from 'src/enum/filter-model-item-operation.enum';
import { FilterModelLogicOperatorEnum } from 'src/enum/filter-model-logic-operator.enum';

export enum methodSorting {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class FilterModelItemValueDto {
  label: string;
  value: string | number | Date;
}

export class FilterModelDto {
  @IsNotEmpty()
  @IsEnum(FilterModelLogicOperatorEnum)
  linkOperator: FilterModelLogicOperatorEnum;

  @IsOptional()
  @IsArray()
  @Type(() => FilterModelItemDto)
  @ValidateNested({ each: true })
  items: FilterModelItemDto[];

  @IsOptional()
  @IsEnum(FilterModelLogicOperatorEnum)
  quickFilterLogicOperator: FilterModelLogicOperatorEnum;

  @IsOptional()
  quickFilterValues: string[] | number[] | Date[];
}

export class FilterModelItemDto {
  @IsNotEmpty()
  @IsString()
  columnField: string;

  @IsNotEmpty()
  @IsEnum(FilterModelItemOperationEnum)
  operatorValue: FilterModelItemOperationEnum;

  value: string | number | Date | string[] | number[] | Date[];
}

export class PaginationDto {
  page: number;
  limit: number;
  sortField?: string;
  sortType: methodSorting;
}
