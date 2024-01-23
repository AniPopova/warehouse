import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/access.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Public()
  // @Post('/login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.email, signInDto.password);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Public()
  // @Post('/signup')
  // async signup(@Body() email: string, @Body('password') password: string) {
  //   try {
  //     await this.authService.signup(email, password);
  //     return { message: 'Signup successful' };
  //   } catch (error) {
  //     if (error instanceof BadRequestException) {
  //       throw new BadRequestException(error.message);
  //     }
  //     throw new BadRequestException('Signup failed');
  //   }
  // }


@Post('signup')
async signup(@Body() createUserDto: CreateUserDto) {
  try {
    const result = await this.authService.signup(createUserDto);
    return { message: 'Signup successful', ...result };
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }
    throw new BadRequestException('Signup failed');
  }
}

// @Post('signin')
// async signIn(@Body() signInDto: SignInDto) {
//   try {
//     const result = await this.authService.signIn(signInDto.email, signInDto.password);
//     return result;
//   } catch (error) {
//     throw new BadRequestException('Signup failed');
//   }
// }

}