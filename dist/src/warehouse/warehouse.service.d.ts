import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
export declare class WarehouseService {
    private warehouseRepository;
    constructor(warehouseRepository: Repository<Warehouse>);
    create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse>;
    findAll(): Promise<Warehouse[]>;
    findOneBy(id: string): Promise<Repository<Warehouse>>;
    update(id: string, attrs: Partial<Warehouse>): Promise<Warehouse>;
    remove(id: string): Promise<string>;
}
