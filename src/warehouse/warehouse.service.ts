import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';


@Injectable()
export class WarehouseService {
  constructor(@InjectRepository(Warehouse) private warehouseRepository: Repository<Warehouse>) { }

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    const newWarehouse = this.warehouseRepository.create(createWarehouseDto);
    return await this.warehouseRepository.save(newWarehouse);
  }

  findAll() {
    return this.warehouseRepository.find();
  }

  async findOneBy(id: string) {
    const warehouse = await this.warehouseRepository.findOneByOrFail({ id });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with id ${id} not found.`);
    }
    return this.warehouseRepository;

  }

  async update(id: string, attrs: Partial<Warehouse>) {
    const warehouse = await this.warehouseRepository.findOneBy({ id });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with id: ${id} not found!`);
    }
    Object.assign(warehouse, attrs);
    await this.warehouseRepository.save(warehouse);
    return warehouse;
  }

  async remove(id: string) {
    const warehouse = await this.warehouseRepository.findOneBy({ id });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with id: ${id} not found.`);
    }
    warehouse.deletedAt = new Date();
    await this.warehouseRepository.save(warehouse);
    return `Warehouse with id${id} successfully removed.`;
  }
}
