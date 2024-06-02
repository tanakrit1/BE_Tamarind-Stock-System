import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { Export_DepositModel, Export_DepositPaginationModel } from "src/app/models/export_deposit.model";
import { PaginationMetadataModel } from "src/app/models/base.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";


export class Export_DepositPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => Export_DepositModel)
    data: Export_DepositModel[];

    static convertToViewModel(
        pagination: Export_DepositPaginationModel,
        metadata: PaginationMetadataModel,
    ): Export_DepositPaginationVm {
        return plainToInstance(Export_DepositPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.export_deposits.map(
                (export_deposit) => Export_DepositResponseVm.convertToViewModel(export_deposit).data,
            ),
        } as Export_DepositPaginationVm);
    }
}

export class Export_DepositResponseVm extends ResponseVm {
    @Type(() => Export_DepositModel)
    data: Export_DepositModel;
    static convertToViewModel(response: Export_DepositModel): Export_DepositResponseVm {
        try {
            return plainToInstance(Export_DepositResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as Export_DepositResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}