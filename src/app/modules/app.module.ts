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
import { CustomerModule } from './customer.module';
import { CustomerSubscriber } from 'src/database/subscribers/customer.subscriber';
import { Transaction_ImportModule } from './transaction_import.module';
import { Transaction_ExportModule } from './transaction_export.module';
import { Import_DepositModule } from './import_deposit.module';
import { Export_DepositModule } from './export_deposit.module';

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
    subscribers:[ProductSubscriber,SupplierSubscriber,CustomerSubscriber],
    synchronize: true,
  }),
  UserModule,
  AuthModule,
  ConfigurationModule,
  ProductModule,
  SupplierModule,
  CustomerModule,
  Transaction_ImportModule,
  Transaction_ExportModule,
  Import_DepositModule,
  Export_DepositModule
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
