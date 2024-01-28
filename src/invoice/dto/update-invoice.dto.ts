
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateInvoiceDto {

  @IsUUID()
  @IsOptional()
  orderId?: string;
}
