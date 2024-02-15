import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/decorators/access.decorator';


@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  @Roles('OPERATOR')
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOneById(id);
  }

  @Patch(':id')
  @Roles('OPERATOR')
  async update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    return await this.clientService.update(id, body);
  }

  @Delete(':id')
  @Roles('OPERATOR')
  async remove(@Param('id') id: string) {
    return await this.clientService.softDelete(id);
  }

  @Delete('perm/:id')
  async permRemove(@Param('id') id: string) {
    return await this.clientService.permanentDelete(id);
  }
}
