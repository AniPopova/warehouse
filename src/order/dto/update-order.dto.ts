import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderType } from '../entities/order.entity';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(OrderType)
  @IsOptional()
  type?: OrderType;

  @IsUUID()
  @IsOptional()
  clientId?: string;
}