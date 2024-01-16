import { OrderType } from '../entities/order.entity';
export declare class CreateOrderDto {
    type: OrderType;
    clientId: string;
}
