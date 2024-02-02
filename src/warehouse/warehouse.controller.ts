import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';


@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  @Post()
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR)
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return await this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findAll() {
    return await this.warehouseService.findAll();
  }

  @Get(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.warehouseService.findOneById(id);
  }

  @Patch(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return await this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.warehouseService.softDelete(id);
  }

  @Delete('perm/:id')
  @Roles(UserRights.OPERATOR)
  async permDelete(@Param('id') id: string) {
    return await this.warehouseService.permanentDelete(id)
  }
}

