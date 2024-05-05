
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from 'src/config/jwt.config';
import { UserModule } from './user.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../service/auth.service';
import { JwtStrategy } from '../passports/jwt.strategy';
import { LocalStrategy } from '../passports/local.strategy';


@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    PassportModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule { }
