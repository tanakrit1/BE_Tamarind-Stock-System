import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserPaginationModel } from "../models/user.model";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async validate(username: string): Promise<any> {
        return await this.userRepository.findByUsername(username);
      }
      async search(dto):Promise<UserPaginationModel>{
        const models = await this.userRepository.search(dto);
        return models
      }
    
}