import { Type, plainToInstance } from 'class-transformer';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { ResponseVm } from '../base/base.vm';
import { AuthTokenModel } from 'src/app/models/auth-token.model';

export class AuthResponseVm extends ResponseVm {
  @Type(() => AuthTokenModel)
  data: AuthTokenModel;
  static convertToViewModel(response: AuthTokenModel): AuthResponseVm {
    try {
      return plainToInstance(AuthResponseVm, {
        statusCode: HttpStatus.OK,
        message: HttpStatus[HttpStatus.OK],
        data: response,
      } as AuthResponseVm);
    } catch (err) {
      throw new InternalServerErrorException(undefined, err.errors);
    }
  }
}

export class AuthGenerateTokenRequestDto {
  id: number;
  username: string;
  role: string;
}
