
import { IsEnum, IsUUID, IsNotEmpty } from 'class-validator';
import { OrderType } from '../entities/order.entity'; // Adjust the import path based on your project structure

export class CreateOrderDto {
  @IsEnum(OrderType)
  type: OrderType;

  @IsUUID('4', { message: 'Invalid UUID' })
  @IsNotEmpty()
  clientId: string;
}
