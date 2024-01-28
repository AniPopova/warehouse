import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { UserRoleGuard } from 'guards/user-role.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('warehouse')
@UseGuards(AuthGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  @Post()
  @UseGuards(UserRoleGuard)
  @Roles(UserRights.OPERATOR, UserRights.OWNER)
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return await this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  async findAll() {
    return await this.warehouseService.findAll();
  }

  @Get(':id')
  @UseGuards(UserRoleGuard)
  @Roles(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.warehouseService.findOneById(id);
  }

  @Patch(':id')
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return await this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.warehouseService.softDelete(id);
  }

  @Delete('perm/:id')
  @Roles(UserRights.OWNER)
  async permDelete(@Param('id') id:string){
    return await this.warehouseService.permanentDelete(id)
  }
}

