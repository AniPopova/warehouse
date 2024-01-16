import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Access } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { UserRoleGuard } from 'src/user/user-role.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }
  
  @Post()
  // @Access(UserRights.OWNER, UserRights.OPERATOR)
  // @UseGuards(UserRoleGuard)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOneBy(id);
  }

  @Patch('/:id')
  // @Access(UserRights.OWNER, UserRights.OPERATOR)
  // @UseGuards(UserRoleGuard)
  update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    return this.clientService.update(id, body);
  }

  @Delete('/:id')
  // @Access(UserRights.OWNER, UserRights.OPERATOR)
  // @UseGuards(UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
