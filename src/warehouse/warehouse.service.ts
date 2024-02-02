import { Injectable,  NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';


@Injectable()
export class WarehouseService {
  constructor(@InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>) { }

  async create(createWarehouseDto: CreateWarehouseDto){
    try {
      const newWarehouse = this.warehouseRepository.create(createWarehouseDto);      
      return await this.warehouseRepository.save(newWarehouse);
    } catch (error) {
      console.error('Impossible create', error);
    }
  }
  

  async findAll(): Promise<Warehouse[]> {
    try{  
    const warehouses = await this.warehouseRepository.find();
      if (warehouses.length === 0) {
        throw new NotFoundException('DB is empty!');
      }
      return warehouses;
    } catch(error){
      console.error('Check the backend!', error)
    }
  }

  async findOneById(id: string) {
      const warehouse = await this.warehouseRepository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException(`Warehouse not found.`);
      }
      return warehouse;
  }

  async update(id: string, attrs: Partial<Warehouse>) {
    try {
      const warehouse = await this.warehouseRepository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException(`Warehouse not found!`);
      }
      Object.assign(warehouse, attrs);
      await this.warehouseRepository.save(warehouse);
      return warehouse;
    } catch (error) {
      console.error('Update not executed', error);
    }
  }

  async softDelete(id: string) {
    try {
      const warehouse = await this.warehouseRepository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException(`Warehouse not found.`);
      }
      warehouse.deletedAt = new Date();
      await this.warehouseRepository.save(warehouse);
      return `Warehouse successfully removed.`;
    } catch (error) {
      console.error('Error during delete.', error);
    }
  }


  async permanentDelete(id: string) {
    try {
      const warehouse = await this.warehouseRepository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException(`Warehouse not found.`);
      }
      console.log(`Warehouse permanently removed.`);
      return await this.warehouseRepository.remove(warehouse);   
    } catch (error) {
      console.error('Error during permanently deleting warehouse.', error);
    }
  }
}
