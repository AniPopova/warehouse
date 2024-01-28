import { Logger, Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse, User])],
  controllers: [WarehouseController],
  providers: [UserService, WarehouseService, Logger],
  exports: [TypeOrmModule]
})
export class WarehouseModule { }
