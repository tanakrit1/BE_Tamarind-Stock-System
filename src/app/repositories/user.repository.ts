import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { UserModel } from "../models/user.model";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) { }

    async findByUsername(username: string): Promise<UserModel> {
        try {
          const user: UserModel = await this.repository.findOne({
            where: { username: username },
          });
          return user;
        } catch (err) {
          throw new InternalServerErrorException(err.message + err?.query);
        }
      }

}