import { Injectable, Logger, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Injectable()
export class WarehouseService {
  constructor(@InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
    private readonly logger: Logger) { }

  async create(createWarehouseDto: CreateWarehouseDto){
    try {
      const newWarehouse = this.warehouseRepository.create(createWarehouseDto);      
      return await this.warehouseRepository.save(newWarehouse);
    } catch (error) {
      this.logger.error('Impossible create', error);
    }
  }
  

  async findAll(): Promise<Warehouse[] | null> {
      const warehouses =  this.warehouseRepository.find();
      if ((await warehouses).length === 0) {
        throw new NotFoundException('DB is empty!');
      }
      return warehouses;
   
  }

  async findOneById(id: string) {
    try {
      const warehouse = await this.warehouseRepository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException(`Warehouse not found.`);
      }
      return warehouse;
    } catch (error) {
      this.logger.error(`Error during search: `, error);
    }

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
      this.logger.error('Update not executed', error);
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
      this.logger.error('Error during delete.', error);
    }
  }


  async permanentDelete(id: string) {
    try {
      const warehouse = await this.warehouseRepository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException(`Warehouse with id: ${id} not found.`);
      }
      console.log(`Warehouse permanently removed.`);
      return await this.warehouseRepository.remove(warehouse);   
    } catch (error) {
      this.logger.error('Error during permanently deleting warehouse.', error);
    }
  }
}
