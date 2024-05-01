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
    
}