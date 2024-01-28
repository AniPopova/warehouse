import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRights } from '../entities/user.entity'
import { IsString, IsOptional, IsEnum, IsEmail} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(UserRights)
  @IsOptional()
  userRole?: UserRights;

  @IsEmail()
  @IsOptional()
  email?: string;
}