import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/access.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.signup(createUserDto);     
      return { message: 'Signup successful' };
    } catch (error) {
      throw new BadRequestException('Signup failed');
    }
  }

}
