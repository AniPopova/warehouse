import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const { name, type, unit } = this.productRepository.create(createProductDto);

      if (type === 'LIQUID') {
        if (unit !== 'l') {
          throw new Error('Invalid combination: LIQUID type must have unit L.');
        }
      } else {
        if (unit !== 'kg') {
          throw new UnauthorizedException('Invalid combination: Non-liquid type must have unit kg.');
        }
      }
      return await this.productRepository.save({
        name,
        type,
        unit
      });

     
    } catch (error) {
      throw new BadRequestException('Failure during creating product', error);
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    if (!products || products.length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return products;
  }

  async findOneById(id: string): Promise<Product> {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product not found.`)
      }
      return product;
  }

  async update(id: string, attrs: Partial<Product>) {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product not found`);
      }
      Object.assign(product, attrs);
      await this.productRepository.save(product);
      return product;
  }

  async remove(id: string) {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Product not found, try again.');
      }
      product.deletedAt = new Date();
      await this.productRepository.save(product);
      return product;
  }

  async permanentDelete(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product not found.`);
      }   
      console.log('Successfully deleted.')
      await this.productRepository.remove(product);
      return product;
    } catch (error) {
      throw new BadRequestException('Error during permanent delete.', error);
    }
  }
}
