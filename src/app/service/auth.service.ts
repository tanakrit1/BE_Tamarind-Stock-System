import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  getCookieJwtAccessToken(
    payload: any,
  ): any {
    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign({ payload }),
    }
  }

}