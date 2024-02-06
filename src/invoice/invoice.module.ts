import { Module, forwardRef } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { OrderModule } from 'src/order/order.module';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { ClientService } from 'src/client/client.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Order, OrderDetail, Client, Warehouse, Product]),
  forwardRef(() => OrderModule)
  ],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    OrderService,
    OrderDetailsService,
    ClientService,
    WarehouseService,
    ProductService],
  exports: [InvoiceService],
})
export class InvoiceModule { }
