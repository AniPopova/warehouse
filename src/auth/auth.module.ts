import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';  
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { AppController } from 'src/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([JwtModule]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    AuthService, 
    UserService, 
    Logger,
  ],  
  exports: [AuthService, TypeOrmModule],  
})

export class AuthModule {}