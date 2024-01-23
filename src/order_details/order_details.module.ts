import { Logger, Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { UserRoleGuard } from 'guards/user-role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, Logger, UserRoleGuard],
  exports: [TypeOrmModule]
})
export class OrderDetailsModule { }
