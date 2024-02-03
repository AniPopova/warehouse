import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/decorators/access.decorator';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { RolesGuard } from 'src/guards/role.guard';


@Controller('order')
@UseGuards(RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @Roles('OPERATOR')
  async create(@Body() body: { createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto, createInvoiceDto: CreateInvoiceDto }) {
    const { createOrderDto, createOrderDetailDto, createInvoiceDto } = body;
  
    await this.orderService.create(createOrderDto, createOrderDetailDto, createInvoiceDto);
  
    return body;
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOneById(id);
  }

  @Patch(':id')
  @Roles('OPERATOR')
  async update(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    return await this.orderService.update(id, body);
  }

  @Delete(':id')
  @Roles('OPERATOR')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }

  @Delete('perm/:id')
  @Roles('OWNER')
  async permanentDelete(@Param('id') id: string) {
    return await this.orderService.permanentDelete(id);
  }
}
