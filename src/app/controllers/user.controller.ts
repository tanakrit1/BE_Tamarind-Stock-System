import { Body, Controller, Delete, Param, Patch, Post, Req } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { CreateUserDto, SearchUserDto, UpdateUserDto } from "../dto/user/user.dto";
import { PaginationMetadataModel } from "../models/base.model";
import { HandleErrorException } from "../exceptions/handleErrorException.exception";
import { UserPaginationVm, UserResponseVm } from "../view-model/user/user.vm";
import { AuthService } from "../service/auth.service";
import { UserModel } from "../models/user.model";
import { NotFoundException } from "../exceptions/not-found.exception";
import { plainToInstance } from "class-transformer";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Post('search')
  async search(@Body() dto: SearchUserDto): Promise<UserPaginationVm> {
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

  @Post()
  async cretae(
    @Body() createRequestVm: CreateUserDto,
  ): Promise<UserResponseVm> {
    try {
      createRequestVm.password = this.authService.hashPassword(
        createRequestVm.password,
      );
      const created: UserModel = await this.userService.create(createRequestVm);
      return UserResponseVm.convertToViewModel(created);
    } catch (err) {
      console.log(err)
      throw HandleErrorException(err);
    }
  }

  @Patch('/:username')
  async update(
    @Param('username') username: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseVm> {
    try{
      const user = await this.userService.validate(username);
      if (!user) {
        throw new NotFoundException(
          { field: 'username', value: username },
          `ไม่สามารถระบุตัวตน ${username} ได้`,
        );
      }
      if (dto.password) {
        dto.password = this.authService.hashPassword(dto.password);
      }
      const updateDto: UpdateUserDto = plainToInstance(UpdateUserDto, {
        ...user,
        ...dto,
      } as UpdateUserDto);
      const updated: UserModel = await this.userService.update(updateDto);
      return UserResponseVm.convertToViewModel(updated);
    }catch(err){
      throw HandleErrorException(err);
    }
  }

  @Delete('/:username')
  async delete(@Param('username') username: string): Promise<UserResponseVm> {
    try {
      const user = await this.userService.validate(username);
      if (!user) {
        throw new NotFoundException(
          { field: 'username', value: username },
          `ไม่พบข้อมูลของผู้ใช้ ${username}`,
        );
      }
      const deleted: UserModel = await this.userService.delete(user);
      return UserResponseVm.convertToViewModel(deleted);
    } catch (err) {
      throw HandleErrorException(err);
    }
  }

}