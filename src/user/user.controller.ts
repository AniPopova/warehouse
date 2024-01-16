import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Patch, 
  Param, 
  UseGuards, 
  SetMetadata, 
  Body} from '@nestjs/common';
import { UserRoleGuard } from './user-role.guard';
import { UserRights } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Access, Serialize } from 'src/decorators/access.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';


@Controller('user')
//@Serialize(UserDto)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Serialize(UserDto)// this could be used globally by appling to the controller
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Serialize(UserDto)
  @Get('/:id')
  findOne(id: string) {    
    return this.userService.findOneById(id);
  }


  @Post()
  @Access(UserRights.OPERATOR, UserRights.OWNER)
  @UseGuards(UserRoleGuard)
  create(@Body() body: CreateUserDto) {
    const newUser = this.userService.create(body);
    return `New ${newUser} created successfully.`;
  }

  @Patch('/:id')
  @SetMetadata('roles', [UserRights.OPERATOR, UserRights.OWNER])
  @UseGuards(UserRoleGuard)
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = this.userService.update(id, body);
    return `User ${user} updated successfully.`;
  }

  @Delete('/:id')
  @SetMetadata('roles', [UserRights.OWNER])
  @UseGuards(UserRoleGuard)
  remove(@Param('id') id: string) {
    return `User with id:${id} deleted successfully.`;
  }
}
