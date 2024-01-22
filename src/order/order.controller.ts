import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Access } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Access(UserRights.OPERATOR, UserRights.OWNER)
  async create(@Body() createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto, createInvoice?: CreateInvoiceDto) {
    return await this.orderService.create(createOrderDto, createOrderDetailDto);
  }

  @Get()
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOneById(id);
  }

  @Patch(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    return await this.orderService.update(id, body);
  }

  @Delete(':id')
  @Access(UserRights.OWNER, UserRights.VIEWER)
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }

  @Delete('perm/:id')
  @Access(UserRights.OWNER)
  async permanentDelete(@Param('id') id:string){
     return await this.orderService.permanentDelete(id);
  }
}
