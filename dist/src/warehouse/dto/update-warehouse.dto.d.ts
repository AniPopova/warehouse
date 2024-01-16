import { CreateWarehouseDto } from './create-warehouse.dto';
import { ProductType } from 'src/product/entities/product.entity';
declare const UpdateWarehouseDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateWarehouseDto>>;
export declare class UpdateWarehouseDto extends UpdateWarehouseDto_base {
    name?: string;
    type?: ProductType;
    clientId?: string;
}
export {};
