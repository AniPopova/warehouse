import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { InvoiceService } from 'src/invoice/invoice.service';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Invoice, OrderDetail])],
  controllers: [OrderController],
  providers: [OrderService, InvoiceService, OrderDetailsService, UserService, AuthService],
  exports: [TypeOrmModule]
})
export class OrderModule { }
