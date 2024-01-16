import { EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
export declare enum OrderType {
    TRANSFER = "TRANSFER",
    ORDER = "ORDER",
    DELIVERY = "DELIVERY"
}
export declare class Order {
    id: string;
    type: OrderType;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    client: Client;
}
export declare class OrderSubscriber implements EntitySubscriberInterface<Order> {
    listenTo(): typeof Order;
    afterInsert(event: InsertEvent<Order>): Promise<void>;
}
