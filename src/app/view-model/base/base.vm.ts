import {
    IsNumber,
    IsNotEmpty,
    Min,
    IsOptional,
    IsObject,
    IsString,
    IsEnum,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';

import { SortEnum } from 'src/enum/sort.enum';
import { FilterModelDto, methodSorting } from 'src/app/dto/base/base.dto';

  export class ResponseVm {
    statusCode: number;
    description = 'สำเร็จ';
    message: string;
  }

  export class BaseResponseVm {
    statusCode: number;
    message: string;
  }
  
  export class PaginationRequestVm {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit: number;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page: number;
  
    @IsOptional()
    @IsString()
    sortingField?: string;
  
    @IsOptional()
    @IsEnum(methodSorting)
    sortingMethod?: methodSorting;
  
    @IsOptional()
    @IsObject()
    @Type(() => FilterModelDto)
    @ValidateNested()
    filterModel?: FilterModelDto;
  
    @IsOptional()
    @IsString({
      message: (args) => `${args.property} ต้องเป็นตัวอักษร`,
    })
    sortField?: string;
    
    @IsOptional()
    @IsEnum(SortEnum)
    sortType?: SortEnum;
  
    @IsOptional()
    @IsString({
      message: () => `ค้นหาต้องเป็นตัวอักษร`,
    })
    quickFilter?: string;
  }
  
  export class PaginationMetadata {
    page: number;
    perPage: number;
    totalItems: number;
  }
  
  export class PaginationMetadataResponseVm {
    @IsNumber()
    page: number;
  
    @IsNumber()
    perPage: number;
  
    @IsNumber()
    totalPage: number;
  
    @IsNumber()
    totalItems: number;
  
    static convertToViewModel(
      metadata: PaginationMetadata,
    ): PaginationMetadataResponseVm {
      const paginationMetadata: PaginationMetadataResponseVm = {
        page: metadata.page || 1,
        perPage: metadata.perPage || metadata.totalItems,
        totalPage: Math.ceil(metadata.totalItems / (metadata.perPage || 1)),
        totalItems: metadata.totalItems,
      };
      return paginationMetadata;
    }
  }
  