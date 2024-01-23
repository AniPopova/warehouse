import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(body: {
        createOrderDto: CreateOrderDto;
        createOrderDetailDto: CreateOrderDetailDto;
        createInvoiceDto: CreateInvoiceDto;
    }): Promise<{
        order: {
            type: import("./entities/order.entity").OrderType;
            clientId: string;
        } & import("./entities/order.entity").Order;
        orderDetail: {
            warehouseId: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
            totalPrice: number;
        } & import("../order_details/entities/order_detail.entity").OrderDetail;
        invoice: {
            orderId: string;
        } & import("../invoice/entities/invoice.entity").Invoice;
    } | {
        order: {
            type: import("./entities/order.entity").OrderType;
            clientId: string;
        } & import("./entities/order.entity").Order;
        orderDetail: {
            warehouseId: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
            totalPrice: number;
        } & import("../order_details/entities/order_detail.entity").OrderDetail;
        invoice?: undefined;
    }>;
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: string): Promise<import("./entities/order.entity").Order>;
    update(id: string, body: UpdateOrderDto): Promise<import("./entities/order.entity").Order>;
    remove(id: string): Promise<string>;
    permanentDelete(id: string): Promise<import("./entities/order.entity").Order>;
}
