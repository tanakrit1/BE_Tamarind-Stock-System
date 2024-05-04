import { Body, Controller, Post, Req } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { SearchUserDto } from "../dto/user/user.dto";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { UserPaginationVm } from "../view-model/user/user.vm";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('search')
    async search(@Body() dto: SearchUserDto): Promise<any> {
        try {
            const responses = await this.userService.search(dto)
            const pagination: PaginationMetadataModel = {
                page: dto.page,
                perPage: dto.limit,
                totalItems: responses.totalItems,
            };
            return UserPaginationVm.convertToViewModel(responses, pagination)
        } catch (err) {
            console.log(err)
            throw HandleErrorException(err);
        }
    }
}