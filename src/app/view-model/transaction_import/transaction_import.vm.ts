import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { Transaction_ImportModel, Transaction_ImportPaginationModel } from "src/app/models/transaction_import.model";
import { PaginationMetadataModel } from "src/app/models/base.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";

export class Transaction_ImportPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => Transaction_ImportModel)
    data: Transaction_ImportModel[];

    static convertToViewModel(
        pagination: Transaction_ImportPaginationModel,
        metadata: PaginationMetadataModel,
    ): Transaction_ImportPaginationVm {
        return plainToInstance(Transaction_ImportPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.transaction_imports.map(
                (transaction_import) => Transaction_ImportResponseVm.convertToViewModel(transaction_import).data,
            ),
        } as Transaction_ImportPaginationVm);
    }
}

export class Transaction_ImportResponseVm extends ResponseVm {
    @Type(() => Transaction_ImportModel)
    data: Transaction_ImportModel;
    static convertToViewModel(response: Transaction_ImportModel): Transaction_ImportResponseVm {
        try {
            return plainToInstance(Transaction_ImportResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as Transaction_ImportResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
