
import { IsEnum, IsOptional } from 'class-validator';
import { OrderType } from '../entities/order.entity'; 

export class CreateOrderDto {
  @IsEnum(OrderType)
  type: OrderType;

  @IsOptional()
  clientId: string;

  @IsOptional()
  warehouseId: string;
}
