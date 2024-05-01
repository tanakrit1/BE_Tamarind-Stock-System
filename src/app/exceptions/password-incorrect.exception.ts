
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum, ErrorDescriptionEnum } from 'src/enum/error-code.enum';

const index = ErrorCodeEnum[ErrorCodeEnum.PASSWORD_INCORRECT];
export class PasswordIncorrectException extends HttpException {
  constructor(description = ErrorDescriptionEnum[index]) {
    super(
      {
        code: ErrorCodeEnum[index],
        statusCode: HttpStatus.UNAUTHORIZED,
        statusText: HttpStatus[HttpStatus.UNAUTHORIZED],
        description,
        message: ErrorCodeEnum[ErrorCodeEnum[index]],
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
