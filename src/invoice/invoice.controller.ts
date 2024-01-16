import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Access } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { UserRoleGuard } from 'src/user/user-role.guard';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}


  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOneBy(id);
  }

  @Patch(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  @UseGuards(UserRoleGuard)
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @Access(UserRights.OWNER)
  @UseGuards(UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }
}



