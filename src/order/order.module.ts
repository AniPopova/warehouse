import { Module, Logger } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { InvoiceService } from 'src/invoice/invoice.service';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { UserRoleGuard } from 'src/user/user-role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Invoice, OrderDetail])],
  controllers: [OrderController],
  providers: [OrderService, Logger, InvoiceService, OrderDetailsService, UserRoleGuard],
  exports: [TypeOrmModule]
})
export class OrderModule {}
