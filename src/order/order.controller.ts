import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRoleGuard } from 'guards/user-role.guard';

//@UseGuards(UserRoleGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Post()
  // @Roles(UserRights.OPERATOR, UserRights.OWNER)
  // async create(@Body() createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto, createInvoiceDto?: CreateInvoiceDto) {
  //   const { createOrderDto, createOrderDetailDto, createInvoiceDto } = body;
  //   return await this.orderService.create(createOrderDto, createOrderDetailDto, createInvoiceDto);
  // }

  @Post()
  @Roles(UserRights.OPERATOR, UserRights.OWNER)
  async create(@Body() body: { createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto, createInvoiceDto: CreateInvoiceDto }) {
    const { createOrderDto, createOrderDetailDto, createInvoiceDto } = body;
    return await this.orderService.create(createOrderDto, createOrderDetailDto, createInvoiceDto);
  }
  

  @Get()
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
  @Roles(UserRights.OPERATOR, UserRights.OWNER, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOneById(id);
  }

  @Patch(':id')
  @Roles(UserRights.OWNER, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    return await this.orderService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRights.OWNER, UserRights.VIEWER)
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }

  @Delete('perm/:id')
  @Roles(UserRights.OWNER)
  async permanentDelete(@Param('id') id:string){
     return await this.orderService.permanentDelete(id);
  }
}
