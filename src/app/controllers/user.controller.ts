import { Body, Controller, Post, Req } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { SearchUserDto } from "../dto/user/user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('search')
    async search( @Req() req: Request, @Body() dto:SearchUserDto) {
        try {
            console.log(req)
            return dto
        } catch (err) {
            throw new err
        }
    }
}