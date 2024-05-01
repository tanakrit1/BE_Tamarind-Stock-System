
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum, ErrorDescriptionEnum } from 'src/enum/error-code.enum';

const index = ErrorCodeEnum[ErrorCodeEnum.NOT_FOUND];
export class NotFoundException extends HttpException {
  constructor(data: any = '', description = ErrorDescriptionEnum[index]) {
    super(
      {
        code: ErrorCodeEnum[index],
        statusCode: HttpStatus.NOT_FOUND,
        statusText: HttpStatus[HttpStatus.NOT_FOUND],
        description,
        message: ErrorCodeEnum[ErrorCodeEnum[index]],
        data: data,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
