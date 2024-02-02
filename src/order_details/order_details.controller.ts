import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';


@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) { }

  @Get('/best')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findByBestSoldProduct(){
    return await this.orderDetailsService.bestSeller();
  }

  @Get('/best-client')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findByBestClient(){
    return await this.orderDetailsService.bestClientMostOrders();
  }
  @Get('/stock')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findByStock(){
    return await this.orderDetailsService.highestStockPerWarehouse();
  }

  @Get()
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findAll() {
    return await this.orderDetailsService.findAll();
  }

  @Get(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findOne(@Param('id') id: string) { 
    return await this.orderDetailsService.findOneById(id);
  }

  @Patch(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() body: UpdateOrderDetailDto) {
    return await this.orderDetailsService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.orderDetailsService.remove(id);
  }

  @Delete('perm/:id')
  @Roles(UserRights.OPERATOR)
  async permRemove(@Param('id') id: string) {
    return await this.orderDetailsService.permanentDelete(id);
  }
}

