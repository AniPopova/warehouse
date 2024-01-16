
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateInvoiceDto {
  @IsNumber()
  @IsOptional()
  invNumber?: number;

  @IsUUID()
  @IsOptional()
  orderId?: string;
}
