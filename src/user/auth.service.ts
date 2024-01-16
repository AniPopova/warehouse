import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
  }

  async signup(email: string, password: string) {
    const users = await this.userService.findAll();
    if (users.length) {
       throw new BadRequestException('email in use')
    }
  }

  signin() {

  }
}