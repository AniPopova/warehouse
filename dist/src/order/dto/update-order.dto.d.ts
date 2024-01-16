import { CreateOrderDto } from './create-order.dto';
import { OrderType } from '../entities/order.entity';
declare const UpdateOrderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
    type?: OrderType;
    clientId?: string;
}
export {};
