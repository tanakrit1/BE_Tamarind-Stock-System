import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum, ErrorDescriptionEnum } from 'src/enum/error-code.enum';


const index = ErrorCodeEnum[ErrorCodeEnum.FAILED_VERIFY_TOKEN];
export class FailedVerifyTokeyException extends HttpException {
  constructor(description = ErrorDescriptionEnum[index]) {
    super(
      {
        code: ErrorCodeEnum[index],
        statusCode: HttpStatus.BAD_REQUEST,
        statusText: HttpStatus[HttpStatus.BAD_REQUEST],
        description,
        message: ErrorCodeEnum[ErrorCodeEnum[index]],
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
