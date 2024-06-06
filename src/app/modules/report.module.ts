import { Module } from "@nestjs/common";
import { ReportController } from "../controllers/report.controller";
import { ReportService } from "../service/report.service";
import { ProductModule } from "./product.module";
import { Transaction_ImportModule } from "./transaction_import.module";
import { Transaction_ExportModule } from "./transaction_export.module";
import { Import_DepositModule } from "./import_deposit.module";

@Module({
    imports: [
        ProductModule,
        Transaction_ImportModule,
        Transaction_ExportModule,
        Import_DepositModule
    ],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule { }
