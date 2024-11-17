import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductType } from "src/database/entities/producttype.entity";
import { ProductTypeController } from "../controllers/producttype.controller";
import { ProductTypeService } from "../service/producttype.service";
import { ProductTypeRepository } from "../repositories/producttype.repository";

@Module({
    imports: [TypeOrmModule.forFeature([ProductType])],
    controllers: [ProductTypeController],
    providers: [ProductTypeService, ProductTypeRepository],
    exports: [ProductTypeService,TypeOrmModule],
})
export class ProductTypeModule { }