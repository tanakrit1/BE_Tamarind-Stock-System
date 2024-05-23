import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction_ExportController } from "../controllers/transaction_export.controller";
import { Transaction_Export } from "src/database/entities/transaction_export.entity";
import { Transaction_ExportService } from "../service/transaction_export.service";
import { Transaction_ExportRepository } from "../repositories/transaction_export.repository";
import { CustomerModule } from "./customer.module";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction_Export]),CustomerModule],
    controllers: [Transaction_ExportController],
    providers: [Transaction_ExportService, Transaction_ExportRepository],
    exports: [Transaction_ExportService],
})
export class Transaction_ExportModule { }