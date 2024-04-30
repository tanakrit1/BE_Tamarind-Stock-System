import { Body, Controller, Post, Req } from "@nestjs/common";
import { MasterEmployeeService } from "../service/masterEmployee.service";
import { SearchMasterEmployeeDto } from "../dto/masteremployee/masteremployee.dto";

@Controller('masteremployee')
export class MasterEmployeeController {
    constructor(private readonly masterEmployeeService: MasterEmployeeService) { }

    @Post('search')
    async search( @Req() req: Request, @Body() dto:SearchMasterEmployeeDto) {
        try {
            console.log(req)
            return dto
        } catch (err) {
            throw new err
        }
    }
}