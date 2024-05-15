import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const secretKey = configService.get<string>('JWT_SECRET_KEY');
    return {
      secret: secretKey,
      // signOptions: { expiresIn: '5s' },
    };
  },
};
