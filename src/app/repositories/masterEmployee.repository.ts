import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterEmployee } from "src/database/entities/masterEmployee.entity";
import { Repository } from "typeorm";

@Injectable()
export class MasterEmployeeRepository {
    constructor(
        @InjectRepository(MasterEmployee)
        private readonly repository: Repository<MasterEmployee>
    ){}

}