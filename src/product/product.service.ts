import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const { name, type, unit } = createProductDto;

      if (type === 'LIQUID') {
        if (unit !== 'l') {
          throw new Error('Invalid combination: LIQUID type must have unit L.');
        }
      } else {
        if (unit !== 'kg') {
          throw new UnauthorizedException('Invalid combination: Non-liquid type must have unit kg.');
        }
      }

      const newProduct = await this.productRepository.save({
        name,
        type,
        unit
      });

      return newProduct;
    } catch (error) {
      console.error('Failure during creating product', error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch(error){
      console.error('DB empty. ', error)
    }
      
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
      return await this.productRepository.save(product);
  }

  async permanentDelete(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product not found.`);
      }   
      console.log('Successfully deleted.')
      return await this.productRepository.remove(product);
    } catch (error) {
      console.error('Error during permanent delete.', error);
    }
  }
}
