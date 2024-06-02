import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Export_Deposit } from "src/database/entities/export_disposit.entity";
import { SupplierModule } from "./supplier.module";
import { Export_DepositController } from "../controllers/export_deposit.controller";
import { Export_DepositService } from "../service/export_deposit.service";
import { Export_DepositRepository } from "../repositories/export_deposit.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Export_Deposit]),SupplierModule],
    controllers: [Export_DepositController],
    providers: [Export_DepositService, Export_DepositRepository],
    exports: [Export_DepositService],
})
export class Export_DepositModule { }