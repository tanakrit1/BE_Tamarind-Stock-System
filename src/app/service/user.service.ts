import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async validate(username: string): Promise<any> {
        return await this.userRepository.findByUsername(username);
      }
      async search(dto):Promise<any>{
        const models = await this.userRepository.search(dto);
        return models
      }
    
}