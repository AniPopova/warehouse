import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { ProductType } from 'src/product/entities/product.entity';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
  @IsString()
  @IsOptional()
  name?: string;

 @IsEnum(ProductType)
 @IsOptional()
  type?: ProductType;

  @IsUUID()
  @IsOptional()
  clientId?: string;
}
