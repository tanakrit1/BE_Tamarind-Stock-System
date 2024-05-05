import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../service/user.service";
import { UserRepository } from "../repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { AuthModule } from "./auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule),],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule { }