// import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/user/entities/user.entity';
// import { UserRepository } from 'src/user/user.repository';

// @Injectable()
// export class AuthService {

//   constructor(
//     private userService: UserService,
//     private readonly userRepository: UserRepository,
//     private jwtService: JwtService,
//     private logger: Logger
//   ) { }


//   async signup(email: string, password: string) {
//     const users = await this.userService.findAll();
//     if (users.length) {
//       throw new BadRequestException('email in use')
//     }
//       const existingUser = await this.userService.findOneByEmail(email);
    
//       if (existingUser) {
//         throw new BadRequestException('email in use');
//       }
    

//   }

//   async signIn(email: string, pass: string) {
//     try {
//       const user = await this.userService.findOneByEmail(email);

//       if (user && 'password' in user) {
//         const payload = { sub: user.id, username: user.username, role: user.userRole };
//         return {
//           access_token: await this.jwtService.signAsync(payload),
//         };
//       } else {
//         throw new UnauthorizedException('You are not authorized to execute this action!');
//       }
//     } catch (error) {
//       throw this.logger.error('Error during user sign-in', error);
//     }
//   }

//   async validateUser(email: string, password: string): Promise<User | null> {
//     try {
//       const user = await this.userRepository.findOneBy({ email });

//       if (user && (user as User).password === password) {
//         return user as User;
//       }
//       return user;
//     } catch (error) {
//       throw this.logger.error('Error during user validation', error);
//     }
//   }

// }

import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserRights } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private logger: Logger
  ) { }

  async signup(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userService.findOneByEmail(createUserDto.email);

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

      const data = Object.assign({}, createUserDto, {
        rights: UserRights.VIEWER,
        password: hashedPassword,
      }) as DeepPartial<User>;

      const returnedUserFromBase = await this.userService.create(createUserDto);
      const payload = {
        id: returnedUserFromBase.id,
        email: returnedUserFromBase.email,
        rights: returnedUserFromBase.userRole,
      };

      return { access_token: await this.jwtService.signAsync(payload) };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
