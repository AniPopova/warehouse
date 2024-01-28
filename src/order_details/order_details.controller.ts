import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { UserRoleGuard } from 'guards/user-role.guard';

//@UseGuards(UserRoleGuard)
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  async findAll() {
    return await this.orderDetailsService.findAll();
  }

  @Get(':id')
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.orderDetailsService.findOneById(id);
  }

  @Patch(':id')
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() body: UpdateOrderDetailDto) {
    return await this.orderDetailsService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.orderDetailsService.remove(id);
  }

  @Delete('perm/:id')
  @Roles(UserRights.OWNER)
  async permRemove(@Param('id') id: string) {
    return await this.orderDetailsService.permanentDelete(id);
  }
}

