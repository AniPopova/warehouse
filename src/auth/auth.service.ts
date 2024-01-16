import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private logger: Logger
  ) {}

  // async signIn(name, pass) {
  //   const user = await this.userService.findOne(name);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: user.id, name: user.name };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  async signIn(name: string, pass: string) {
    try {
      const user = await this.userService.findOneBy(name);
  
      if (user && 'password' in user) {
        const payload = { sub: user.id, name: user.name };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      this.logger.error('Error during user sign-in', error);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  }
  
  
  
  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ email });
  
      if (user && (user as User).password === password) {
        return user as User;
      }
  
      return null;
    } catch (error) {
      this.logger.error('Error during user validation', error);
      throw error; 
  }
  
}

}