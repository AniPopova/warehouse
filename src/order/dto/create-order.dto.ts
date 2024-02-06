
import { IsEnum, IsUUID } from 'class-validator';
import { OrderType } from '../entities/order.entity'; 

export class CreateOrderDto {
  @IsEnum(OrderType)
  type: OrderType;

  @IsUUID()
  clientId: string;

  @IsUUID()
  warehouseId: string;
}
