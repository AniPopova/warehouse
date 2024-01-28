import { Logger, Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, User])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, Logger, UserService],
  exports: [TypeOrmModule]
})
export class OrderDetailsModule { }
