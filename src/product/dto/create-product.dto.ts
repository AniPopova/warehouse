import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { ProductType, UnitType } from '../entities/product.entity';


export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ProductType)
  @IsNotEmpty()
  type: ProductType;

  @IsEnum(UnitType)
  @IsNotEmpty()
  unit: UnitType;

}
