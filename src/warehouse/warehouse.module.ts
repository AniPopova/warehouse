import { Logger, Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { UserRoleGuard } from 'guards/user-role.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse, User])],
  controllers: [WarehouseController],
  providers: [ AuthService, JwtService, UserService, WarehouseService, Logger, UserRoleGuard],
  exports: [TypeOrmModule]
})
export class WarehouseModule { }
