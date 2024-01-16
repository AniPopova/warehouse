import { Client } from 'src/client/entities/client.entity';
import { ProductType } from 'src/product/entities/product.entity';
export declare class Warehouse {
    id: string;
    name: string;
    type: ProductType;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    client: Client;
}
