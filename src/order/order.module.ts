import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Client } from 'src/client/entities/client.entity';
import { OrderDetailsModule } from 'src/order_details/order_details.module';
import { ClientModule } from 'src/client/client.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { ProductModule } from 'src/product/product.module';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { WarehouseModule } from 'src/warehouse/warehouse.module';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Product } from 'src/product/entities/product.entity';
import { InvoiceService } from 'src/invoice/invoice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Client, Warehouse, OrderDetail, Invoice, Product]),
    ClientModule,
    WarehouseModule,
    forwardRef(()=>OrderDetailsModule),
    forwardRef(()=>ProductModule),
    forwardRef(()=>InvoiceModule)
  ],
  controllers: [OrderController],
  providers: [OrderService, InvoiceService],
  exports: [OrderService],
})
export class OrderModule {}

