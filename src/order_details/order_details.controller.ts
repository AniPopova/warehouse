import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { UserRoleGuard } from 'src/user/user-role.guard';
import { Access } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('order-details')
@UseGuards(AuthGuard, UserRoleGuard)
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findAll() {
    return await this.orderDetailsService.findAll();
  }

  @Get(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.orderDetailsService.findOneById(id);
  }

  @Patch(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() body: UpdateOrderDetailDto) {
    return await this.orderDetailsService.update(id, body);
  }

  @Delete(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.orderDetailsService.remove(id);
  }

  @Delete('perm/:id')
  @Access(UserRights.OWNER)
  async permRemove(@Param('id') id: string) {
    return await this.orderDetailsService.permanentDelete(id);
  }
}

