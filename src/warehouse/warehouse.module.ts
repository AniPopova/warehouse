import { Logger, Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { UserRoleGuard } from 'src/user/user-role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  controllers: [WarehouseController],
  providers: [WarehouseService, Logger, UserRoleGuard],
  exports: [TypeOrmModule]
})
export class WarehouseModule {}
