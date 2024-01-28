import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ProductType, UnitType } from '../entities/product.entity';
import { IsString, IsEnum, IsOptional } from 'class-validator';


export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  name?: string;

 @IsEnum(ProductType)
 @IsOptional()
  type?: ProductType;

 @IsEnum(UnitType)
 @IsOptional()
  unit?: UnitType;

}
