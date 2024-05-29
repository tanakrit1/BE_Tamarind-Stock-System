import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { Import_DepositModel, Import_DepositPaginationModel } from "src/app/models/import_deposit.model";
import { PaginationMetadataModel } from "src/app/models/base.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";

export class Import_DepositPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => Import_DepositModel)
    data: Import_DepositModel[];

    static convertToViewModel(
        pagination: Import_DepositPaginationModel,
        metadata: PaginationMetadataModel,
    ): Import_DepositPaginationVm {
        return plainToInstance(Import_DepositPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.Import_deposits.map(
                (Import_deposit) => Import_DepositResponseVm.convertToViewModel(Import_deposit).data,
            ),
        } as Import_DepositPaginationVm);
    }
}

export class Import_DepositResponseVm extends ResponseVm {
    @Type(() => Import_DepositModel)
    data: Import_DepositModel;
    static convertToViewModel(response: Import_DepositModel): Import_DepositResponseVm {
        try {
            return plainToInstance(Import_DepositResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as Import_DepositResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}