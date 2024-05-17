import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Supplier } from "src/database/entities/supplier.entity";
import { SupplierController } from "../controllers/supplier.controller";
import { SupplierRepository } from "../repositories/supplier.repository";
import { SupplierService } from "../service/supplier.service";

@Module({
    imports: [TypeOrmModule.forFeature([Supplier])],
    controllers: [SupplierController],
    providers: [SupplierService, SupplierRepository],
    exports: [SupplierService],
})
export class SupplierModule { }