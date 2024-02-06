import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRights, User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
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

      const { username, email, password, userRole } = data;
      const returnedUserFromBase = await this.userService.create({ username, email, password, userRole });

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

  async signIn(email: string, pass: string) {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (user && 'password' in user) {
        const payload = { sub: user.id, username: user.username, role: user.userRole };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException('You are not authorized to execute this action!');
      }
    } catch (error) {
      throw new BadRequestException('Error during user sign-in', error);
    }
  }

  validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Decoded user', decoded);
      return decoded;
    } catch (error) {

      throw new UnauthorizedException('Invalid token');
    }
  }


  getUserRole(context: any): string | null {
    const request = context.switchToHttp().getRequest();
    return request.user?.role || null;
  }

  getUserRoleFromToken(token: string): string {
    try {
      const decodedToken: any = this.jwtService.decode(token, { complete: true });

      if (!decodedToken) {
        throw new UnauthorizedException('Invalid token');
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
        throw new UnauthorizedException('Token has expired');
      }

      if (decodedToken.payload && decodedToken.payload.role) {
        return decodedToken.payload.role;
      }

      return null;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
