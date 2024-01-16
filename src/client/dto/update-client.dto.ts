import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  identificationCode?: string;
}