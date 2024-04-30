import { Injectable } from "@nestjs/common";
import { MasterEmployeeRepository } from "../repositories/masterEmployee.repository";

@Injectable()
export class MasterEmployeeService {
    constructor(
        private readonly masterEmployee: MasterEmployeeRepository
    ) { }
}