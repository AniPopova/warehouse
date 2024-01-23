import { Logger } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
export declare class WarehouseService {
    private readonly warehouseRepository;
    private readonly logger;
    constructor(warehouseRepository: Repository<Warehouse>, logger: Logger);
    create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse>;
    findAll(): Promise<Warehouse[] | null>;
    findOneById(id: string): Promise<Warehouse>;
    update(id: string, attrs: Partial<Warehouse>): Promise<Warehouse>;
    softDelete(id: string): Promise<string>;
    permanentDelete(id: string): Promise<Warehouse>;
}
