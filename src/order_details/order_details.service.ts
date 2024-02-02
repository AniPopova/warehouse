import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { OrderDetail } from './entities/order_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { Client } from 'src/client/entities/client.entity';


@Injectable()
export class OrderDetailsService {

  constructor(
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>) { }

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
      throw error('Impossible creation', error);
    }
  }

  async findAll(): Promise<OrderDetail[]> {
    const orderDetails = await this.orderDetailRepository.find();
      if (orderDetails.length === 0) {
        throw new NotFoundException('DB is empty!');
      }
      return orderDetails;
  }

  async findOneById(id: string): Promise<OrderDetail> {
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
      throw error('Update not executed', error);
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
      throw error('Error during deleting data.', error);
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
      throw error('Error during permanent delete.', error);
    }
  }

  // REPORTING
  async bestProduct() {
    const query = await this.orderDetailRepository
      .createQueryBuilder('orderDetail')
      .select([
        'SUM(orderDetail.quantity) AS most_wanted_product',
        'product.name AS product_name',
        'product.unit AS unit',
      ])
      .innerJoin(Order, 'order', 'orderDetail.order_id = order.id')
      .innerJoin(Product, 'product', 'orderDetail.product_id = product.id')
      .where('order.type = :type', { type: 'ORDER' })
      .andWhere('order.deleted_at IS NULL')
      .groupBy('product.name')
      .addGroupBy('orderDetail.quantity')
      .orderBy('most_wanted_product', 'DESC')
      .getRawMany();

    return query;
  }

  async highestStockPerWarehouse(): Promise<any[]> {
    const query = await this.orderDetailRepository
      .createQueryBuilder('orderDetail')
      .select([
        'SUM(orderDetail.quantity) AS total_quantity',
        'product.name AS product_name',
        'warehouse.name AS warehouse_name',
      ])
      .innerJoin(Order, 'o', 'orderDetail.order_id = o.id')
      .innerJoin(Product, 'product', 'orderDetail.product_id = product.id')
      .innerJoin(Warehouse, 'warehouse', 'orderDetail.warehouse_id = warehouse.id')
      .where('o.type IN (:...types)', { types: ['DELIVERY', 'TRANSFER'] })
      .andWhere('o.deleted_at IS NULL')
      .groupBy('product.name')
      .addGroupBy('warehouse.name')
      .orderBy('total_quantity', 'DESC')
      .getRawMany();
  
    return query;
  }
  
  
  async bestClient() {
    const query = await this.orderDetailRepository
      .createQueryBuilder('orderDetail')
      .select([
        'COUNT(orderDetail.id) AS orders',
        'SUM(orderDetail.price) AS total_money_spent',
        'client.name AS client_name',
      ])
      .innerJoin(Order, 'order', 'orderDetail.order_id = order.id')
      .innerJoin(Client, 'client', 'order.client_id = client.id')
      .where('order.deleted_at IS NULL')
      .groupBy('client.name')
      .orderBy('orders', 'DESC')
      .getRawMany();
  
    return query;
  }
  
}
