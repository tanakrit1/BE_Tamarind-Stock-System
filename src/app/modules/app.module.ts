import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { ConfigurationModule } from './confuguration.module';
import { JwtAuthMiddleware } from '../middlewares/jwt.middleware';
import { ProductModule } from './product.module';
import { ProductSubscriber } from 'src/database/subscribers/product.subscriber';
import { SupplierModule } from './supplier.module';
import { SupplierSubscriber } from 'src/database/subscribers/supplier.subscriber';

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
    subscribers:[ProductSubscriber,SupplierSubscriber],
    synchronize: true,
  }),
  UserModule,
  AuthModule,
  ConfigurationModule,
  ProductModule,
  SupplierModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/auth/sign-in', method: RequestMethod.POST },
        { path: '/auth/verify-token', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
