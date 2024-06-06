import { Module } from "@nestjs/common";
import { Import_DepositController } from "../controllers/import_deposit.controller";
import { Import_DepositService } from "../service/import_deposit.service";
import { Import_DepositRepository } from "../repositories/import_deposit.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Import_Deposit } from "src/database/entities/import_deposit.entity";
import { SupplierModule } from "./supplier.module";

@Module({
    imports: [TypeOrmModule.forFeature([Import_Deposit]),SupplierModule],
    controllers: [Import_DepositController],
    providers: [Import_DepositService, Import_DepositRepository],
    exports: [Import_DepositService,TypeOrmModule],
})
export class Import_DepositModule { }