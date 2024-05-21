import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction_Import } from "src/database/entities/transaction_import.entity";
import { Transaction_ImportRepository } from "../repositories/transaction_import.repository";
import { Transaction_ImportService } from "../service/transaction_import.service";
import { Transaction_ImportController } from "../controllers/transaction_import.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction_Import])],
    controllers: [Transaction_ImportController],
    providers: [Transaction_ImportService, Transaction_ImportRepository],
    exports: [Transaction_ImportService],
})
export class Transaction_ImportModule { }