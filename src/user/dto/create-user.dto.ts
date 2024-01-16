import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRights } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(UserRights)
  userRole?: UserRights = UserRights.VIEWER;

  @IsEmail()
  email: string;
}


