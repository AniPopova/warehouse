import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';


@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private readonly invoiceRepository: Repository<Invoice>) { }

  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const newInvoice = this.invoiceRepository.create(createInvoiceDto);
      return await this.invoiceRepository.save(newInvoice);
    } catch (error) {
      throw new BadRequestException('Impossible create', error);
    }
  }


  async findAll(): Promise<Invoice[]> {
    const invoices = await this.invoiceRepository.find();
    if (invoices.length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return invoices;
  }

  async findOneBy(id: string): Promise<Invoice> {
    try {
      const invoice = await this.invoiceRepository.findOneBy({ id });
      if (!invoice) {
        throw new NotFoundException(`Invoice not found.`)
      }
      return invoice;
    } catch (error) {
      throw new BadRequestException(`Error during search of invoice.`, error);
    }
  }

  async findOne(orderId: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOneBy({ orderId });
    if (!invoice) {
      throw new NotFoundException(`Invoice not found.`)
    }
    return invoice;
  }

  async update(id: string, attrs: Partial<Invoice>) {
    try {
      const invoice = await this.invoiceRepository.findOneBy({ id });
      if (!invoice) {
        throw new NotFoundException(`There is no invoice with such id.`)
      }
      Object.assign(invoice, attrs);
      await this.invoiceRepository.save(invoice);
      return invoice;
    } catch (error) {
      throw new BadRequestException('Update not executed', error);
    }
  }


  async remove(id: string) {
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
      throw new BadRequestException(`Error delete of invoice`, error);
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
      throw new BadRequestException('Error during permanent delete.', error);
    }
  }
}
