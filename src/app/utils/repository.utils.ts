import { SelectQueryBuilder, Brackets } from 'typeorm';
import { isNil, isUndefined } from 'lodash';
import { plainToInstance } from 'class-transformer';
import { FilterModelDto, FilterModelItemValueDto, PaginationDto } from '../dto/base/base.dto';
import { FilterModelLogicOperatorEnum } from 'src/enum/filter-model-logic-operator.enum';
import { FilterModelItemOperationEnum, operatorMappings } from 'src/enum/filter-model-item-operation.enum';


export function applyRepositoryQuickFilter(
  query: SelectQueryBuilder<any>,
  entity: string,
  filterModel: FilterModelDto,
  fields: string[] = [],
): void {
  if (
    !isNil(filterModel?.quickFilterLogicOperator) &&
    filterModel?.quickFilterValues?.length > 0 &&
    fields.length > 0
  ) {
    const { quickFilterLogicOperator, quickFilterValues } = filterModel;
    query.andWhere(
      new Brackets((qb) => {
        for (const keyword of quickFilterValues) {
          const filterCondition = new Brackets((qbField) => {
            for (const field of fields) {
              const schemaField = field.split('_');
              const column =
                schemaField.length > 1
                  ? `${schemaField[0]}.${schemaField[1]}`
                  : `${entity}.${schemaField[0]}`;
              qbField.orWhere(`${column} like :${column}`, {
                [column]: `%${keyword}%`,
              });
            }
          });
          if (quickFilterLogicOperator === FilterModelLogicOperatorEnum.AND) {
            qb.andWhere(filterCondition);
          } else {
            qb.orWhere(filterCondition);
          }
        }
      }),
    );
  }
}

export function applyRepositoryFilterModel(
  query: SelectQueryBuilder<any>,
  entity: string,
  filterModel: FilterModelDto,
  fields: string[] = [],
): void {
  if (!isNil(filterModel) && filterModel.items.length > 0) {
    const { items, logicOperator } = filterModel;
    query.andWhere(
      new Brackets((qb) => {
        for (const { field, operator, value } of items) {
          if (
            field !== 'deletedAt' &&
            !isUndefined(value) &&
            (!isNil(value) || typeof value === 'boolean') &&
            (fields.includes(field) || fields.length === 0)
          ) {
            const schemaField = field.split('_');
            const column =
              schemaField.length > 1
                ? `${schemaField[0]}.${schemaField[1]}`
                : `${entity}.${schemaField[0]}`;
            const indexQuery =
              operator === FilterModelItemOperationEnum.BETWEEN
                ? `:${field}_start and :${field}_end`
                : operator === FilterModelItemOperationEnum.ISANYOF ||
                    operator === FilterModelItemOperationEnum.ISNOTANYOF
                  ? `(:...${field})`
                  : operator === FilterModelItemOperationEnum.ISNULL ||
                      operator === FilterModelItemOperationEnum.ISNOTNULL ||
                      operator === FilterModelItemOperationEnum.ISEMPTY ||
                      operator === FilterModelItemOperationEnum.ISNOTEMPTY
                    ? ``
                    : `:${field}`;
            const queryString = `${column} ${operatorMappings[operator]} ${indexQuery}`;
            const whereClause =
              logicOperator === FilterModelLogicOperatorEnum.AND
                ? qb.andWhere
                : qb.orWhere;
            const parameters =
              operator === FilterModelItemOperationEnum.BETWEEN
                ? {
                    [`${field}_start`]: value[0].includes('1900-01-01')
                      ? new Date()
                      : value[0],
                    [`${field}_end`]: value[1].includes('1900-01-01')
                      ? new Date()
                      : value[1],
                  }
                : operator === FilterModelItemOperationEnum.ISANYOF ||
                    operator === FilterModelItemOperationEnum.ISNOTANYOF
                  ? Array.isArray(value)
                    ? {
                        [field]: value.map(
                          (
                            item:
                              | string
                              | number
                              | Date
                              | FilterModelItemValueDto,
                          ) =>
                            typeof item === 'object'
                              ? plainToInstance(FilterModelItemValueDto, item)
                                  .value
                              : item,
                        ),
                      }
                    : { [field]: value }
                  : operator === FilterModelItemOperationEnum.CONTAINT ||
                      operator === FilterModelItemOperationEnum.NOTCONTAINT
                    ? { [`${field}`]: `%${value}%` }
                    : operator === FilterModelItemOperationEnum.STARTSWITH
                      ? { [`${field}`]: `${value}%` }
                      : operator === FilterModelItemOperationEnum.ENDSWITH
                        ? { [`${field}`]: `%${value}` }
                        : operator === FilterModelItemOperationEnum.ISNULL ||
                            operator ===
                              FilterModelItemOperationEnum.ISNOTNULL ||
                            operator === FilterModelItemOperationEnum.ISEMPTY ||
                            operator === FilterModelItemOperationEnum.ISNOTEMPTY
                          ? null
                          : {
                              [field]:
                                typeof value === 'string'
                                  ? value.includes('1900-01-01')
                                    ? new Date()
                                    : value
                                  : value,
                            };
            whereClause.call(qb, queryString, parameters);
          }
        }
      }),
    );
  }
}

export function applyRepositorySortingModel(
  query: SelectQueryBuilder<any>,
  entity: string,
  dto: PaginationDto,
): void {
  if (!isNil(dto.sortField) && !isNil(dto.sortType)) {
    const schemaField = dto.sortField.split('_');
    const column =
      schemaField.length > 1
        ? `${schemaField[0]}.${schemaField[1]}`
        : `${entity}.${schemaField[0]}`;
    query.orderBy(column, dto.sortType);
  } else {
    query.orderBy(`${entity}.createdAt`, 'ASC');
  }
}
