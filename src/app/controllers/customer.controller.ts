import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { CustomerService } from "../service/customer.service";
import { CreateCustomerDto, SearchCustomerDto, UpdateCustomerDto } from "../dto/customer/customer.dto";
import { CustomerPaginationVm, CustomerResponseVm } from "../view-model/costomer/customer.vm";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { plainToInstance } from "class-transformer";
import { CustomerModel } from "../models/customer.model";

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService
  ) { }

  @Post('search')
  async search(@Body() dto: SearchCustomerDto): Promise<CustomerPaginationVm> {
    try {
      const responses = await this.customerService.search(dto)
      const pagination: PaginationMetadataModel = {
        page: dto.page,
        perPage: dto.limit,
        totalItems: responses.totalItems,
      };
      return CustomerPaginationVm.convertToViewModel(responses, pagination)
    } catch (err) {
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  @Post()
  async create(@Body() dto: CreateCustomerDto): Promise<CustomerResponseVm> {
    try {
      const created = await this.customerService.create(dto);
      return CustomerResponseVm.convertToViewModel(created);
    } catch (err) {
      throw HandleErrorException(err);
    }
  }

  @Patch('/:id')
  async update(
    @Param('id') parametersId: number,
    @Body() dto: UpdateCustomerDto,
  ): Promise<CustomerResponseVm> {
    try {
      const customerId = Number(parametersId);
      const customer = await this.customerService.findById(customerId);
      if (!customer) {
        throw new NotFoundException(
          { field: 'id', value: parametersId },
          `ไม่พบข้อมูลของ customer ID ${parametersId}`,
        );
      }
      const updateDto: CustomerModel = plainToInstance(CustomerModel, {
        ...customer,
        ...dto
      })
      const updated: CustomerModel = await this.customerService.update(updateDto)
      return CustomerResponseVm.convertToViewModel(updated)
    } catch (err) {
      throw HandleErrorException(err)
    }
  }

  @Delete('/:id')
  async delete(@Param('id') parametersId: number): Promise<CustomerResponseVm> {
    try {
        const customerId = Number(parametersId);
      const customer = await this.customerService.findById(customerId);
      if (!customer) {
        throw new NotFoundException(
          { field: 'id', value: parametersId },
          `ไม่พบข้อมูลของ customer ID ${parametersId}`,
        );
      }
      const deleted: CustomerModel = await this.customerService.delete(customer);
      return CustomerResponseVm.convertToViewModel(deleted);
    } catch (err) {
      throw HandleErrorException(err);
    }
  }
}