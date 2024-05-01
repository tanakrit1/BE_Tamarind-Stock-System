
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum, ErrorDescriptionEnum } from 'src/enum/error-code.enum';

const index_ = ErrorCodeEnum[ErrorCodeEnum.INVALID_DATA_LENGTH];
export class InvalidDataLengthException extends HttpException {
  constructor(description = ErrorDescriptionEnum[index_], index?: string) {
    super(
      {
        code: ErrorCodeEnum[index_],
        statusCode: HttpStatus.BAD_REQUEST,
        statusText: HttpStatus[HttpStatus.BAD_REQUEST],
        description,
        message: ErrorCodeEnum[ErrorCodeEnum[index_]],
        index: index,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
