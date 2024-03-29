import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module'; 
import { WarehouseModule } from './warehouse/warehouse.module';
import { ClientModule } from './client/client.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { InvoiceModule } from './invoice/invoice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data.source';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User]),
    UserModule,
    ClientModule,
    ProductModule,
    WarehouseModule,
    OrderModule,
    InvoiceModule,
    OrderDetailsModule,
    AuthModule
  ],
  controllers: [AuthController],
  providers: [
    AuthModule
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}




