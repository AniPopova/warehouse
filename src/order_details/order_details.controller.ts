import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRoleGuard } from 'src/guards/user-role.guard';

//@UseGuards(UserRoleGuard)
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) { }

  @Get('/best')
  async findByBestSoldProduct(){
    return await this.orderDetailsService.bestSeller();
  }

  @Get('/best-client')
  async findByBestClient(){
    return await this.orderDetailsService.bestClientMostOrders();
  }
  @Get('/stock')
  async findByStock(){
    return await this.orderDetailsService.highestStockPerWarehouse();
  }

  @Get()
  async findAll() {
    return await this.orderDetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) { 
    return await this.orderDetailsService.findOneById(id);
  }

  @Patch(':id')
  @Roles(['OWNER', 'OPERATOR'])
  async update(@Param('id') id: string, @Body() body: UpdateOrderDetailDto) {
    return await this.orderDetailsService.update(id, body);
  }

  @Delete(':id')
  @Roles(['OWNER', 'OPERATOR'])
  async remove(@Param('id') id: string) {
    return await this.orderDetailsService.remove(id);
  }

  @Delete('perm/:id')
  @Roles(['OWNER'])
  async permRemove(@Param('id') id: string) {
    return await this.orderDetailsService.permanentDelete(id);
  }
}

