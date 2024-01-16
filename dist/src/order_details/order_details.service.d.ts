import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';
export declare class OrderDetailsService {
    private clientRepository;
    constructor(clientRepository: Repository<OrderDetail>);
    create(createOrderDetailDto: CreateOrderDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderDetailDto: UpdateOrderDetailDto): string;
    remove(id: number): string;
}
