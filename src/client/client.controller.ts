import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { UserRoleGuard } from 'guards/user-role.guard';

//@UseGuards(UserRoleGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get()
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOneById(id);
  }

  @Patch(':id')
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    return await this.clientService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.clientService.softDelete(id);
  }

  @Delete('perm/:id')
  @Roles(UserRights.OWNER)
  async permRemove(@Param('id') id: string) {
    return await this.clientService.permanentDelete(id);
  }
}
