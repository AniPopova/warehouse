import { Logger } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';
export declare class OrderDetailsService {
    private readonly orderDetailRepository;
    private readonly logger;
    constructor(orderDetailRepository: Repository<OrderDetail>, logger: Logger);
    create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail>;
    findAll(): Promise<OrderDetail[]>;
    findOneById(id: string): Promise<OrderDetail | null>;
    update(id: string, attrs: Partial<OrderDetail>): Promise<OrderDetail>;
    remove(id: string): Promise<string>;
    permanentDelete(id: string): Promise<OrderDetail>;
}
