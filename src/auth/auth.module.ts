import { Logger, Module } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';  
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import dataSource, { JWT_SECRET } from 'db/data.source'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([JwtModule]),
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: JWT_SECRET,
        signOptions: { expiresIn: '48h' },
      }),
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
