import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { Transaction_ImportModel, Transaction_ImportPaginationModel } from "src/app/models/transaction_import.model";
import { PaginationMetadataModel } from "src/app/models/base.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Transaction_ExportModel, Transaction_ExportPaginationModel } from "src/app/models/transaction_export.model";

export class Transaction_ExportPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => Transaction_ExportModel)
    data: Transaction_ExportModel[];

    static convertToViewModel(
        pagination: Transaction_ExportPaginationModel,
        metadata: PaginationMetadataModel,
    ): Transaction_ExportPaginationVm {
        return plainToInstance(Transaction_ExportPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.transaction_exports.map(
                (transaction_export) => Transaction_ExportResponseVm.convertToViewModel(transaction_export).data,
            ),
        } as Transaction_ExportPaginationVm);
    }
}

export class Transaction_ExportResponseVm extends ResponseVm {
    @Type(() => Transaction_ExportModel)
    data: Transaction_ExportModel;
    static convertToViewModel(response: Transaction_ExportModel): Transaction_ExportResponseVm {
        try {
            return plainToInstance(Transaction_ExportResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as Transaction_ExportResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
