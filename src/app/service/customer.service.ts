import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repository";
import { CustomerModel, CustomerPaginationModel } from "../models/customer.model";
import { CreateCustomerDto } from "../dto/customer/customer.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CustomerService {
    constructor(
        private readonly customerRepository: CustomerRepository
    ) { }

    async findById(id: number): Promise<CustomerModel> {
        return await this.customerRepository.findById(id);
    }

    async search(dto): Promise<CustomerPaginationModel> {
        const models = await this.customerRepository.search(dto);
        return models
    }

    async create(dto: CreateCustomerDto): Promise<CustomerModel> {
        const model: CustomerModel = plainToInstance(CustomerModel, dto as CustomerModel)
        return await this.customerRepository.save(model);
    }

    async update(dto: CreateCustomerDto): Promise<CustomerModel> {
        const model: CustomerModel = plainToInstance(
            CustomerModel,
            dto as CustomerModel,
        );
        return await this.customerRepository.save(model);
    }

    async delete(model: CustomerModel): Promise<CustomerModel> {
        return await this.customerRepository.delete(model);
    }
}