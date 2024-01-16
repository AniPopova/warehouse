import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ClientModule } from './client/client.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { InvoiceModule } from './invoice/invoice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data.source';
import { APP_FILTER } from '@nestjs/core';
import { AuthorizationExceptionFilter } from './exception/authorization-exception.filter';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    ClientModule,
    WarehouseModule,
    ProductModule,
    OrderModule,
    OrderDetailsModule,
    InvoiceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AuthorizationExceptionFilter,
    },
  ],
})



export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}

}