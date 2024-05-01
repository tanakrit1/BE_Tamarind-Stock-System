import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { Request } from "express";
import { LocalAuthGuard } from "../guards/local.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
   
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Req() request: Request): Promise<any> {
    console.log(request)
    const token: any = this.service.getCookieJwtAccessToken({
      id: '1',
      username: 'supphakit',
      role: '1',
    });
    return token
  }

}