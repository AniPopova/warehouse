import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';  
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { AppController } from 'src/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JwtModule]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UserController, AppController],
  providers: [AuthService, UserService, Logger, AppService],  
  exports: [AuthService, TypeOrmModule],  
})

export class AuthModule {}