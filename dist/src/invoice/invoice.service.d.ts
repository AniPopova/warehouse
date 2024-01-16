import { Logger } from '@nestjs/common';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
export declare class InvoiceService {
    private readonly invoiceRepository;
    private readonly logger;
    constructor(invoiceRepository: Repository<Invoice>, logger: Logger);
    findAll(): Promise<Invoice[]>;
    findOneBy(id: string): Promise<Invoice>;
    update(id: string, attrs: Partial<Invoice>): Promise<Invoice>;
    remove(id: string): Promise<string>;
}
