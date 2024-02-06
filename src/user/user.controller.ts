import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles, Serialize } from 'src/decorators/access.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Serialize(UserDto)
  @Post()
  @Roles('OPERATOR')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Serialize(UserDto)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Serialize(UserDto)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  @Serialize(UserDto)
  @Patch(':id')
  @Roles('OPERATOR')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Serialize(UserDto)
  @Delete(':id')
  @Roles('OPERATOR')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Serialize(UserDto)
  @Delete('perm/:id')
  @Roles('OWNER')
  async permRemove(@Param('id') id: string) {
    return await this.userService.permanentDelete(id);
  }

}


