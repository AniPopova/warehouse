
import { IsEnum, IsUUID, IsNotEmpty } from 'class-validator';
import { OrderType } from '../entities/order.entity'; 

export class CreateOrderDto {
  @IsEnum(OrderType)
  type: OrderType;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;
}
