import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class InvoiceService {

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly logger: Logger,
  ) { }

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  findOneBy(id: string) {
    return this.invoiceRepository.findOneByOrFail({ id });
  }

  async update(id: string, attrs: Partial<Invoice>) {
    const invoice = await this.findOneBy(id);
    if (!invoice) {
      throw new NotFoundException(`There is no invoice with such id:${id}.`)
    }
    Object.assign(invoice, attrs);
    await this.invoiceRepository.save(invoice);
    return invoice;
  }


  async remove(id: string): Promise<string> {
    try {
      const invoice = await this.invoiceRepository.findOneBy({ id });

      if (!invoice) {
        throw new NotFoundException(`Invoice with id: ${id} not found`);
      }

      invoice.deletedAt = new Date();
      await this.invoiceRepository.save(invoice);
      return `Invoice with id: ${id} removed successfully.`
    }
    catch (error) {
      this.logger.error(`Error during soft delete of an invoice`, error);
    }
  }
}
