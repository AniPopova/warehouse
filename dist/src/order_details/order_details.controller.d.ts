import { OrderDetailsService } from './order_details.service';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
export declare class OrderDetailsController {
    private readonly orderDetailsService;
    constructor(orderDetailsService: OrderDetailsService);
    findAll(): Promise<import("./entities/order_detail.entity").OrderDetail[]>;
    findOne(id: string): Promise<import("./entities/order_detail.entity").OrderDetail>;
    update(id: string, body: UpdateOrderDetailDto): Promise<import("./entities/order_detail.entity").OrderDetail>;
    remove(id: string): Promise<string>;
    permRemove(id: string): Promise<import("./entities/order_detail.entity").OrderDetail>;
}
