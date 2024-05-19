import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { CustomerModel, CustomerPaginationModel } from "src/app/models/customer.model";
import { PaginationMetadataModel } from "src/app/models/base.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";


export class CustomerPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => CustomerModel)
    data: CustomerModel[];

    static convertToViewModel(
        pagination: CustomerPaginationModel,
        metadata: PaginationMetadataModel,
    ): CustomerPaginationVm {
        return plainToInstance(CustomerPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.customers.map(
                (customer) => CustomerResponseVm.convertToViewModel(customer).data,
            ),
        } as CustomerPaginationVm);
    }
}

export class CustomerResponseVm extends ResponseVm {
    @Type(() => CustomerModel)
    data: CustomerModel;
    static convertToViewModel(response: CustomerModel): CustomerResponseVm {
        try {
            return plainToInstance(CustomerResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as CustomerResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}