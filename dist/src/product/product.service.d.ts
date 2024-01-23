import { Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductService {
    private productRepository;
    private readonly logger;
    constructor(productRepository: Repository<Product>, logger: Logger);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        type: import("./entities/product.entity").ProductType;
        unit: import("./entities/product.entity").UnitType;
    } & Product>;
    findAll(): Promise<Product[] | null>;
    findOneById(id: string): Promise<Product | null>;
    update(id: string, attrs: Partial<Product | null>): Promise<Product>;
    remove(id: string): Promise<Product>;
    permanentDelete(id: string): Promise<string>;
}
