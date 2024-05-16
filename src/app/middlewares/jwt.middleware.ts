import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

import { AuthService } from '../service/auth.service';
import { UserModel } from '../models/user.model';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) { }
  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const decodedToken = await this.authService.verifyToken(token);
        request.user = decodedToken;
        const user = plainToInstance(UserModel, decodedToken as UserModel);
      } catch (err) {
        const error =
          err instanceof HttpException
            ? new UnauthorizedException(err.getResponse())
            : new UnauthorizedException(err.message);
        throw error;
      }
    }else{
      throw new UnauthorizedException()
    }
    next();
  }
}
