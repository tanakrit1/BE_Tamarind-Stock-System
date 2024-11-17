import { plainToInstance, Type } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { ProductTypeModel, ProductTypePaginationModel } from "src/app/models/producttype.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { PaginationMetadataModel } from "src/app/models/base.model";


export class ProductTypePaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => ProductTypeModel)
    data: ProductTypeModel[];

    static convertToViewModel(
        pagination: ProductTypePaginationModel,
        metadata: PaginationMetadataModel,
    ): ProductTypePaginationVm {
        return plainToInstance(ProductTypePaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.producttypes.map(
                (producttype) => ProductTypeResponseVm.convertToViewModel(producttype).data,
            ),
        } as ProductTypePaginationVm);
    }
}

export class ProductTypeResponseVm extends ResponseVm {
    @Type(() => ProductTypeModel)
    data: ProductTypeModel;
    static convertToViewModel(response: ProductTypeModel): ProductTypeResponseVm {
        try {
            return plainToInstance(ProductTypeResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as ProductTypeResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}