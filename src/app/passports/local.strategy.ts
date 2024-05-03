import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { UsernameIncorrectException } from "../exceptions/username-incorrect.exception";
import { UserDto } from "../dto/user/user.dto";
import { plainToInstance } from "class-transformer";
import { UserModel } from "../models/user.model";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<UserModel> {
    try {
      const userValidateDto ={
        username: username,
        password: password,
      };
      const user =
        await this.authService.validateUser(userValidateDto);
      if (!user) {
        throw new UsernameIncorrectException(
          'ไม่พบผู้ใช้งานของคุณกรุณาตรวจสอบ',
        );
      }
      const userDto: UserDto = plainToInstance(UserDto, user as UserDto);
      // const updatedUser: UserModel = await this.authService.updateUser(userDto);
      return user
    } catch (err) {
      const error =
        err instanceof HttpException
          ? new UnauthorizedException(err.getResponse())
          : new UnauthorizedException(err.message);
      throw error;
    }
  }
  
}
