import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { UserRoleGuard } from '../../guards/user-role.guard';
import { UserRights } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles, Serialize } from 'src/decorators/access.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

//@UseGuards(UserRoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Serialize(UserDto)
  @Get()
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  findAll() {
    return this.userService.findAll();
  }

  @Serialize(UserDto)
  @Get(':id')
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  async getUser(@Param('id') id: string) {
      return await this.userService.findOneById(id);
  }

  @Serialize(UserDto)
  @Post()
  @Roles(UserRights.OPERATOR, UserRights.OWNER)
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Serialize(UserDto)
  @Patch(':id')
  @Roles(UserRights.OPERATOR, UserRights.OWNER)
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Serialize(UserDto)
  @Delete(':id')
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Serialize(UserDto)
  @Delete('perm/:id')
  @Roles(UserRights.OWNER)
  async permRemove(@Param('id') id: string) {
    return await this.userService.permanentDelete(id);
  }

}
