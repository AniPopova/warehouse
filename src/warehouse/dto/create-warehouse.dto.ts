import { IsString, IsNotEmpty, IsEnum, IsUUID } from "class-validator";
import { ProductType } from "src/product/entities/product.entity";

export class CreateWarehouseDto {

  @IsString()
  @IsNotEmpty()
  name: string;

 @IsEnum(ProductType)
  type: ProductType;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;
}
