import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-order_detail.dto';
import { IsUUID, IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
  @IsUUID('4', { message: 'Invalid UUID' })
  @IsNotEmpty()
  @IsOptional()
  warehouseId?: string;

  @IsUUID('4', { message: 'Invalid UUID' })
  @IsNotEmpty()
  @IsOptional()
  orderId?: string;

  @IsUUID('4', { message: 'Invalid UUID' })
  @IsNotEmpty()
  @IsOptional()
  productId?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price?: number;

}
