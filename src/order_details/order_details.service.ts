import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { OrderDetail } from './entities/order_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class OrderDetailsService {

  constructor(
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly logger: Logger) { }

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    try {
      const { warehouseId, orderId, productId, price, quantity } = createOrderDetailDto;
      const orderDetails = await this.orderDetailRepository.save({
        warehouseId,
        orderId,
        productId,
        price,
        quantity,});
      return orderDetails;
    } catch (error) {
      throw this.logger.error('Impossible creation', error);
    }
  }

  async findAll(): Promise<OrderDetail[]> {
    const orderDetails =  this.orderDetailRepository.find();
      if ((await orderDetails).length === 0) {
        throw new NotFoundException('DB is empty!');
      }
      return orderDetails;
  }

  async findOneById(id: string): Promise<OrderDetail | null> {
    try {
      const orderDetail = await this.orderDetailRepository.findOneBy({ id });
      if (!orderDetail) {
        throw new NotFoundException('No records with such id.');
      }
      return orderDetail;
    } catch (error) {
      throw new BadRequestException('Error finding details by id.');
    }

  }

  async update(id: string, attrs: Partial<OrderDetail>) {
    try {
      const orderDetail = await this.orderDetailRepository.findOneBy({ id });
      if (!orderDetail) {
        throw new NotFoundException(`Details with id:${id} not found`);
      }

      Object.assign(orderDetail, attrs);
      await this.orderDetailRepository.save(orderDetail);
      return orderDetail;
    } catch (error) {
      throw this.logger.error('Update not executed', error);
    }
  }

  async remove(id: string) {
    try {
      const od = await this.orderDetailRepository.findOneBy({ id });
      if (!od) {
        throw new NotFoundException(`Data not found`);
      }
      od.deletedAt = new Date();
      await this.orderDetailRepository.save(od);
      return `Details removed successfully`;
    } catch (error) {
      throw this.logger.error('Error during deleting data.', error);
    }
  }

  async permanentDelete(id: string) {
    try {
      const orderDetail = await this.orderDetailRepository.findOneBy({ id });
      if (!orderDetail) {
        throw new NotFoundException(`Data not found.`);
      }
      return await this.orderDetailRepository.remove(orderDetail);
    } catch (error) {
      throw this.logger.error('Error during permanent delete.', error);
    }
  }
}
