
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum, ErrorDescriptionEnum } from 'src/enum/error-code.enum';

const index = ErrorCodeEnum[ErrorCodeEnum.GRANT_DENIED];
export class GrantDeniedException extends HttpException {
  constructor(description = ErrorDescriptionEnum[index]) {
    super(
      {
        code: ErrorCodeEnum[index],
        statusCode: HttpStatus.FORBIDDEN,
        statusText: HttpStatus[HttpStatus.FORBIDDEN],
        description,
        message: ErrorCodeEnum[ErrorCodeEnum[index]],
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
