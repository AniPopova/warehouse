import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRights } from '../entities/user.entity'
import { IsString, IsOptional, IsEnum, IsEmail, IsStrongPassword } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsString()
  @IsOptional()
  name?: string;

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