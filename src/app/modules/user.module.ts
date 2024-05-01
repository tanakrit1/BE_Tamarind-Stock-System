import { Module } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../service/user.service";
import { UserRepository } from "../repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule { }