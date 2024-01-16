import { CreateProductDto } from './create-product.dto';
import { ProductType, UnitType } from '../entities/product.entity';
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    name?: string;
    type?: ProductType;
    unit?: UnitType;
    clientId?: string;
}
export {};
