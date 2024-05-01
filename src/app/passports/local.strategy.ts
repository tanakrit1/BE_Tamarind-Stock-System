import { Injectable } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  // async validate(username: string, password: string): Promise<any> {
  //   try {
  //     const userValidateDto ={
  //       username: username,
  //       password: password,
  //     };
  //     // const user: UserModel =
  //     //   await this.authService.validateUser(userValidateDto);
  //     // if (!user) {
  //     //   throw new UsernameIncorrectException(
  //     //     'ไม่พบผู้ใช้งานของคุณกรุณาตรวจสอบ',
  //     //   );
  //     // }
  //     // const currentDate = dayjs().format('YYYY-MM-DD');
  //     // const expiredDate = dayjs(user.passwordExpired).format('YYYY-MM-DD');
  //     // const userDto: UserDto = plainToInstance(UserDto, user as UserDto);
  //     // userDto.lastLoginAt = new Date();
  //     // if (expiredDate <= currentDate) {
  //     //   const resetToken = this.authService.getCookieJwtResetPassword({
  //     //     id: user.id,
  //     //     username: user.username,
  //     //     role: user.role,
  //     //     passwordExpired: user.passwordExpired,
  //     //     grant: GrantEnum.PASSWORD_EXPIRED,
  //     //   });
  //     //   throw new PasswordExpiredException(resetToken);
  //     // }
  //     // const updatedUser: UserModel = await this.authService.updateUser(userDto);
  //     // return { ...user, lastLoginAt: updatedUser.lastLoginAt };
  //     return userValidateDto
  //   } catch (err) {
  //     // const error =
  //     //   err instanceof HttpException
  //     //     ? new UnauthorizedException(err.getResponse())
  //     //     : new UnauthorizedException(err.message);
  //     // throw error;
  //     throw err
  //   }
  // }
  
}
