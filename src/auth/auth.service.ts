import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private logger: Logger
  ) { }


  async signup(email: string, password: string) {
    const users = await this.userService.findAll();
    if (users.length) {
      throw new BadRequestException('email in use')
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
      this.logger.error('Error during user sign-in', error);
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (user && (user as User).password === password) {
        return user as User;
      }
      return user;
    } catch (error) {
      throw this.logger.error('Error during user validation', error);

    }
  }

}