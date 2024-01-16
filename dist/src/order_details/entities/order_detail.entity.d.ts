import { Warehouse } from "src/warehouse/entities/warehouse.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
export declare class OrderDetail {
    id: string;
    warehouseId: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    get totalPrice(): number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    warehouse: Warehouse;
    order: Order;
    product: Product;
}
