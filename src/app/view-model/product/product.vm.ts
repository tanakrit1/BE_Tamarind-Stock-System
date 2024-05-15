import { Type, plainToInstance } from "class-transformer";
import { PaginationMetadataResponseVm, ResponseVm } from "../base/base.vm";
import { ProductModel, ProductPaginationModel } from "src/app/models/product.model";
import { PaginationMetadataModel } from "src/app/models/base.model";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";



export class ProductPaginationVm extends ResponseVm {
    @Type(() => PaginationMetadataResponseVm)
    metadata?: PaginationMetadataResponseVm;

    @Type(() => ProductModel)
    data: ProductModel[];

    static convertToViewModel(
        pagination: ProductPaginationModel,
        metadata: PaginationMetadataModel,
    ): ProductPaginationVm {
        return plainToInstance(ProductPaginationVm, {
            statusCode: HttpStatus.OK,
            message: HttpStatus[HttpStatus.OK],
            metadata: PaginationMetadataResponseVm.convertToViewModel(metadata),
            data: pagination.products.map(
                (product) => ProductResponseVm.convertToViewModel(product).data,
            ),
        } as ProductPaginationVm);
    }
}

export class ProductResponseVm extends ResponseVm {
    @Type(() => ProductModel)
    data: ProductModel;
    static convertToViewModel(response: ProductModel): ProductResponseVm {
        try {
            return plainToInstance(ProductResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as ProductResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}