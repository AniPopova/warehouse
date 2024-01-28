import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRoleGuard } from '../../guards/user-role.guard';
 import { AuthService } from '../auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [AuthService, JwtService, UserService, UserRoleGuard, Logger, AuthGuard],
  exports: [TypeOrmModule]
})


export class UserModule { }
