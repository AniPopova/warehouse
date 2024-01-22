import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly logger: Logger) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const { name, type, unit } = createProductDto;

      if (type === 'LIQUID') {
        if (unit !== 'l') {
          throw new Error('Invalid combination: LIQUID type must have unit L.');
        }
      } else {
        if (unit !== 'kg') {
          throw new Error('Invalid combination: Non-liquid type must have unit kg.');
        }
      }

      const newProduct = await this.productRepository.save({
        name,
        type,
        unit
      });

      return newProduct;
    } catch (error) {
      throw this.logger.error('Failure during creating product', error);
    }
  }

  async findAll(): Promise<Product[] | null> {
      return await this.productRepository.find();
  }

  async findOneById(id: string): Promise<Product | null> {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product with id: ${id}, not found.`)
      }
      return product;
  }

  async update(id: string, attrs: Partial<Product | null>) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product not found`);
      }
      Object.assign(product, attrs);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.logger.error('Update not executed', error);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Product not found, try again.');
      }
      product.deletedAt = new Date();
      return await this.productRepository.save(product);
    } catch (error) {
      this.logger.error('Error during deleting product.', error);
    }
  }

  async permanentDelete(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product not found.`);
      }
      return await this.productRepository.remove(product);
    } catch (error) {
      this.logger.error('Error during permanent delete.', error);
    }
  }
}
