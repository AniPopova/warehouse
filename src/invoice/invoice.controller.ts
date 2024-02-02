import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';


@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) { }

  @Get()
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findAll() {
    return await this.invoiceService.findAll();
  }

  @Get(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.invoiceService.findOneBy(id);
  }

  @Patch(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @Roles(UserRights.OPERATOR, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.invoiceService.remove(id);
  }

  @Delete('perm/:id')
  @Roles(UserRights.OPERATOR)
  async permDelete(@Param('id') id: string) {
    return await this.invoiceService.permanentDelete(id)
  }
}







