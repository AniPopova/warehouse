import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Access } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRoleGuard } from 'src/user/user-role.guard';

@Controller('warehouses')
@UseGuards(AuthGuard, UserRoleGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  @Post()
  @Access(UserRights.OPERATOR, UserRights.OWNER)
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return await this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findAll() {
    return await this.warehouseService.findAll();
  }

  @Get(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.warehouseService.findOneById(id);
  }

  @Patch(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return await this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.warehouseService.softDelete(id);
  }

  @Delete('perm/:id')
  @Access(UserRights.OWNER)
  async permDelete(@Param('id') id:string){
    return await this.warehouseService.permanentDelete(id)
  }
}

