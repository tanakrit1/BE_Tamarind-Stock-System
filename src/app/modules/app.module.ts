import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterEmployeeModule } from './masterEmployee.module';

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
  MasterEmployeeModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
