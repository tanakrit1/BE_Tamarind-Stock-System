import { Module } from "@nestjs/common";
import { MasterEmployeeController } from "../controllers/masterEmployee.controller";
import { MasterEmployeeService } from "../service/masterEmployee.service";
import { MasterEmployeeRepository } from "../repositories/masterEmployee.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterEmployee } from "src/database/entities/masterEmployee.entity";

@Module({
    imports: [TypeOrmModule.forFeature([MasterEmployee])],
    controllers: [MasterEmployeeController],
    providers: [MasterEmployeeService, MasterEmployeeRepository],
    exports: [MasterEmployeeService],
})
export class MasterEmployeeModule{}