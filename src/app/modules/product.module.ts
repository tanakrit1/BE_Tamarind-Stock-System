import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "../service/product.service";
import { ProductRepository } from "../repositories/product.repositoy";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService],
})
export class ProductModule { }