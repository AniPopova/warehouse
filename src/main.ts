import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';
import { UserRoleGuard } from './user/user-role.guard';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalGuards(new UserRoleGuard(app.get(Reflector)));
    await app.listen(3000);
    console.log(`Application is running on: http://localhost:3000`);
  } catch (error) {
    console.error('Error during application startup:', error);
    process.exit(1);
  }
}

bootstrap();
