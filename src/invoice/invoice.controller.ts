import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Access } from 'src/decorators/access.decorator';
import { UserRights } from 'src/user/entities/user.entity';
import { UserRoleGuard } from 'src/user/user-role.guard';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('invoice')
@UseGuards(AuthGuard, UserRoleGuard)
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) { }

  @Get()
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findAll() {
    return await this.invoiceService.findAll();
  }

  @Get(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR, UserRights.VIEWER)
  async findOne(@Param('id') id: string) {
    return await this.invoiceService.findOneBy(id);
  }

  @Patch(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @Access(UserRights.OWNER, UserRights.OPERATOR)
  async remove(@Param('id') id: string) {
    return await this.invoiceService.remove(id);
  }

  @Delete('perm/:id')
  @Access(UserRights.OWNER)
  async permDelete(@Param('id') id: string) {
    return await this.invoiceService.permanentDelete(id)
  }
}







