import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { IsString, IsNotEmpty, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { ProductType } from 'src/product/entities/product.entity';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

 @IsEnum(ProductType)
 @IsOptional()
  type?: ProductType;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  clientId?: string;
}
