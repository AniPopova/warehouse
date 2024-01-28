import { Module, Logger } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User])],
  controllers: [InvoiceController],
  providers: [UserService, InvoiceService, Logger],
  exports: [TypeOrmModule]
})
export class InvoiceModule {}
