import { BadRequestException, Injectable,  NotFoundException } from '@nestjs/common';
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
      throw new BadRequestException('Impossible create', error);
    }
  }
  

  async findAll(): Promise<Warehouse[]> {
    const warehouses = await this.warehouseRepository.find();
      if (warehouses.length === 0) {
        throw new NotFoundException('DB is empty!');
      }
      return warehouses;
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
      throw new BadRequestException('Update not executed', error);
    }
  }

  async softDelete(id: string) {
      const warehouse = await this.warehouseRepository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException(`Warehouse not found.`);
      }
      warehouse.deletedAt = new Date();
      console.log('Successfully removed record.')     
      return await this.warehouseRepository.save(warehouse);;

  }


  async permanentDelete(id: string) {
      const warehouse = await this.warehouseRepository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException(`Warehouse not found.`);
      }
      console.log(`Warehouse permanently removed.`);
      return await this.warehouseRepository.remove(warehouse);   
  }
}
