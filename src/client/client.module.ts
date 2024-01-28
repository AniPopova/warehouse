import { Module, Logger } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { UserRoleGuard } from 'guards/user-role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService, UserRoleGuard, Logger],
  exports: [TypeOrmModule]
})
export class ClientModule { }
