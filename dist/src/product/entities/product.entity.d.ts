import { Client } from 'src/client/entities/client.entity';
export declare enum ProductType {
    LIQUID = "LIQUID",
    NON_LIQUID = "NON_LIQUID"
}
export declare enum UnitType {
    KILOGRAMS = "kg",
    LITTERS = "l"
}
export declare class Product {
    id: string;
    name: string;
    type: ProductType;
    unit: UnitType;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    client: Client;
}
