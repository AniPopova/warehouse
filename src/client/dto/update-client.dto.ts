import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  identificationCode: string;
}