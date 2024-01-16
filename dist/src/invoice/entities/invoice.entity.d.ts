import { Order } from 'src/order/entities/order.entity';
export declare class Invoice {
    static save(invoice: Invoice): void;
    id: string;
    invNumber: number;
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    order: Order;
}
