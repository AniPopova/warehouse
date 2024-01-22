import { Logger } from '@nestjs/common';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoiceService {
    private readonly invoiceRepository;
    private readonly logger;
    constructor(invoiceRepository: Repository<Invoice>, logger: Logger);
    createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice>;
    findAll(): Promise<Invoice[] | null>;
    findOneBy(id: string): Promise<Invoice>;
    findOne(orderId: string): Promise<Invoice>;
    update(id: string, attrs: Partial<Invoice>): Promise<Invoice>;
    remove(id: string): Promise<string>;
    permanentDelete(id: string): Promise<string>;
}
