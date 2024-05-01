
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum, ErrorDescriptionEnum } from 'src/enum/error-code.enum';

const index = ErrorCodeEnum[ErrorCodeEnum.BAD_REQUEST];
export class BadRequestException extends HttpException {
  constructor(data: any = '', description = ErrorDescriptionEnum[index]) {
    super(
      {
        code: ErrorCodeEnum[index],
        statusCode: HttpStatus.BAD_REQUEST,
        statusText: HttpStatus[HttpStatus.BAD_REQUEST],
        description,
        message: ErrorCodeEnum[ErrorCodeEnum[index]],
        data: data,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
