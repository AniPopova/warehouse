import { Module, Logger } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JWT_SECRET } from 'db/data.source';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User]),
  JwtModule.registerAsync({
    useFactory: () => ({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '48h' },
    }),
  }),],
  controllers: [InvoiceController],
  providers: [UserService, InvoiceService, AuthService],
  exports: [TypeOrmModule]
})
export class InvoiceModule {}
