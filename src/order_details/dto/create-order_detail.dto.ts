import { IsUUID, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDetailDto {
  @IsUUID('4', { message: 'Invalid UUID' })
  @IsNotEmpty()
  warehouseId: string;

  @IsUUID('4', { message: 'Invalid UUID' })
  @IsNotEmpty()
  orderId: string;

  @IsUUID('4', { message: 'Invalid UUID' })
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

}
