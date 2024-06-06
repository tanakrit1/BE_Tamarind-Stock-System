import { plainToInstance } from "class-transformer";
import { ResponseVm } from "../base/base.vm";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";

export class ReportResponseVm extends ResponseVm {
    data;
    static convertToViewModel(response): ReportResponseVm {
        try {
            return plainToInstance(ReportResponseVm, {
                statusCode: HttpStatus.OK,
                message: HttpStatus[HttpStatus.OK],
                data: response,
            } as ReportResponseVm);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}