import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRoleGuard } from 'src/guards/user-role.guard';

@UseGuards(UserRoleGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) { }

  @Get()
  async findAll() {
    return await this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.invoiceService.findOneBy(id);
  }

  @Patch(':id')
  @Roles(['OWNER', 'OPERATOR'])
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @Roles(['OWNER', 'OPERATOR'])
  async remove(@Param('id') id: string) {
    return await this.invoiceService.remove(id);
  }

  @Delete('perm/:id')
  @Roles(['OWNER'])
  async permDelete(@Param('id') id: string) {
    return await this.invoiceService.permanentDelete(id)
  }
}







