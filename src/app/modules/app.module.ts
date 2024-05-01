import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { ConfigurationModule } from './confuguration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tamarind-stock',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  UserModule,
  AuthModule,
  ConfigurationModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
