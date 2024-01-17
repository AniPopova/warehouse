import { Module, NestModule, MiddlewareConsumer,  ValidationPipe} from '@nestjs/common';
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
import { APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { AuthorizationExceptionFilter } from './exception/authorization-exception.filter';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserRoleGuard } from './user/user-role.guard';
import { UserRepository } from './user/user.repository';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
    UserModule,
    ClientModule,
    WarehouseModule,
    ProductModule,
    OrderModule,
    OrderDetailsModule,
    InvoiceModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AuthorizationExceptionFilter,
    },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe, 
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: UserRoleGuard,
    // },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}


