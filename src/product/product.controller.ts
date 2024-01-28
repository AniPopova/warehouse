import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorators/access.decorator';
import { UserRoleGuard } from 'src/guards/user-role.guard';

@UseGuards(UserRoleGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @Roles(['OWNER', 'OPERATOR'])
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOneById(id);
  }

  @Patch(':id')
  @Roles(['OWNER', 'OPERATOR'])
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(['OWNER', 'OPERATOR'])
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

  @Delete('perm/:id')
  @Roles(['OWNER'])
  async permRemove(@Param('id') id: string) {
    return await this.productService.permanentDelete(id);
  }
}
