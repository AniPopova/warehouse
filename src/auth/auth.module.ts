import { Logger, Module } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';  
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import dataSource, { JWT_SECRET } from 'db/data.source'; 
import { User } from 'src/user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';


  @Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      UserModule,
      JwtModule.register({
        global: true,
        secret: JWT_SECRET,
        signOptions: { expiresIn: '48h' },
      }),
    ],
    controllers: [UserController, AuthController],
    providers: [
      AuthService, 
      UserService, 
      Logger,
      {
        provide: APP_GUARD,
        useClass: AuthGuard,
      },
    ],  
    exports: [AuthService, TypeOrmModule, JwtModule],  
  })

export class AuthModule {}
