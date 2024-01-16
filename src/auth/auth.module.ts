import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';  // Make sure to import UserService
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UserController],
  providers: [AuthService, UserService, Logger],  
  exports: [AuthService],  
})

export class AuthModule {}