import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { SupplierModel, SupplierPaginationModel } from "src/app/models/supplier.model";
import { PaginationMetadataModel } from "src/app/models/base.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";

export class SupplierPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => SupplierModel)
    data: SupplierModel[];

    static convertToViewModel(
        pagination: SupplierPaginationModel,
        metadata: PaginationMetadataModel,
    ): SupplierPaginationVm {
        return plainToInstance(SupplierPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.suppliers.map(
                (supplier) => SupplierResponseVm.convertToViewModel(supplier).data,
            ),
        } as SupplierPaginationVm);
    }
}

export class SupplierResponseVm extends ResponseVm {
    @Type(() => SupplierModel)
    data: SupplierModel;
    static convertToViewModel(response: SupplierModel): SupplierResponseVm {
        try {
            return plainToInstance(SupplierResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as SupplierResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}