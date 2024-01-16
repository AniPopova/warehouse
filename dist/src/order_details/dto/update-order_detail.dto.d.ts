import { CreateOrderDetailDto } from './create-order_detail.dto';
declare const UpdateOrderDetailDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderDetailDto>>;
export declare class UpdateOrderDetailDto extends UpdateOrderDetailDto_base {
    warehouseId?: string;
    orderId?: string;
    productId?: string;
    quantity?: number;
    price?: number;
}
export {};
