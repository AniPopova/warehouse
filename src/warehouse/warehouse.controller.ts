import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Roles } from 'src/decorators/access.decorator';
import { RolesGuard } from 'src/guards/role.guard';


@Controller('warehouse')
@UseGuards(RolesGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  @Post()
  @Roles('OPERATOR')
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return await this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  async findAll() {
    return await this.warehouseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.warehouseService.findOneById(id);
  }

  @Patch(':id')
  @Roles('OPERATOR')
  async update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return await this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  @Roles('OPERATOR')
  async remove(@Param('id') id: string) {
    return await this.warehouseService.softDelete(id);
  }

  @Delete('perm/:id')
  @Roles('OWNER')
  async permDelete(@Param('id') id: string) {
    return await this.warehouseService.permanentDelete(id)
  }
}

