import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Patch, 
  Param, 
  UseGuards, 
  Body} from '@nestjs/common';
import { UserRoleGuard } from './user-role.guard';
import { UserRights } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Access, Serialize } from 'src/decorators/access.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
@UseGuards(AuthGuard, UserRoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Serialize(UserDto)
  @Get()
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  findAll() {
    return this.userService.findAll();
  }

  @Serialize(UserDto)
  @Get('param')
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async getUser( @Param('param') param: string) {
    if (param === 'email') {
      return await this.userService.findOneByEmail(param);
    } else if (param === 'username') {
      return await this.userService.findOneByUserName(param);
    } else if (param === 'id') {
      return await this.userService.findOneById(param);
    } else {
      return 'Invalid search parameter';
    }
  }

  @Serialize(UserDto)
  @Post()
  @Access(UserRights.OPERATOR, UserRights.OWNER)
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Patch(':id')
  @Access(UserRights.OPERATOR, UserRights.OWNER)
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Delete('perm/:id')
  @Access(UserRights.OWNER)
  async permRemove(@Param('id') id: string) {
    return await this.userService.permanentDelete(id);
  }

}
