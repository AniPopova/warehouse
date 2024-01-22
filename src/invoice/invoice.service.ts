import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';


@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly logger: Logger,
  ) { }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    try {
      const { orderId } = createInvoiceDto;
      const newInvoice = await this.invoiceRepository.save({
        orderId,
      });
      return newInvoice;
    } catch (error) {
      this.logger.error('Impossible create', error);
    }
  }

  async findAll(): Promise<Invoice[] | null> {
    const invoices =  this.invoiceRepository.find();
    if ((await invoices).length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return invoices;
  }

  async findOneBy(id: string): Promise<Invoice> {
    try{
      const invoice = await this.invoiceRepository.findOneBy({ id });
    if(!invoice){
      throw new NotFoundException(`Invoice with id: ${id}, not found.`)
    }
    return invoice;
    } catch (error) {
      this.logger.error(`Error during search of invoice.`, error);
    }
  }

  async findOne(orderId: string): Promise<Invoice> {
    try{
      const invoice = await this.invoiceRepository.findOneBy({ orderId });
    if(!invoice){
      throw new NotFoundException(`Invoice not found.`)
    }
    return invoice;
    } catch (error) {
      this.logger.error(`Error during search of invoice.`, error);
    }
  }

  async update(id: string, attrs: Partial<Invoice>) {
    try {
      const invoice = await this.findOneBy(id);
      if (!invoice) {
        throw new NotFoundException(`There is no invoice with such id:${id}.`)
      }
      Object.assign(invoice, attrs);
      await this.invoiceRepository.save(invoice);
      return invoice;
    } catch (error) {
      this.logger.error('Update not executed', error);
    }
  }


  async remove(id: string){
    try {
      const invoice = await this.invoiceRepository.findOneBy({ id });
      if (!invoice) {
        throw new NotFoundException(`Invoice not found`);
      }
      invoice.deletedAt = new Date();
      await this.invoiceRepository.save(invoice);
      return `Invoice removed successfully.`
    }
    catch (error) {
      this.logger.error(`Error delete of invoice`, error);
    }
  }

  async permanentDelete(id: string) {
    try {
      const invoice = await this.invoiceRepository.findOneBy({ id });
      if (!invoice) {
        throw new NotFoundException(`Invoice not found.`);
      }
      await this.invoiceRepository.remove(invoice);
      return `Invoice permanently removed.`;
    } catch (error) {
      this.logger.error('Error during permanently deleting warehouse.', error);
    }
  }
}
