import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/database/entities/customer.entity";
import { CustomerController } from "../controllers/customer.controller";
import { CustomerService } from "../service/customer.service";
import { CustomerRepository } from "../repositories/customer.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerRepository],
    exports: [CustomerService],
})
export class CustomerModule { }