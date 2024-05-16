
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum, ErrorDescriptionEnum } from 'src/enum/error-code.enum';

const index = ErrorCodeEnum[ErrorCodeEnum.DUPLICATE_DATA];
export class DuplicateDataException extends HttpException {
  constructor(description = ErrorDescriptionEnum[index], value?: string) {
    super(
      {
        code: ErrorCodeEnum[index],
        statusCode: HttpStatus.CONFLICT,
        statusText: HttpStatus[HttpStatus.CONFLICT],
        description,
        message: [ErrorCodeEnum[ErrorCodeEnum[index]]],
        value: value,
      },
      HttpStatus.CONFLICT,
    );
  }
}

