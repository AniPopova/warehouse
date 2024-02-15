import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InvoiceService } from 'src/invoice/invoice.service';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { ClientService } from 'src/client/client.service';
import { ProductService } from 'src/product/product.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private readonly invoiceService: InvoiceService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly clientService: ClientService,
    private readonly warehouseService: WarehouseService,
    private readonly productService: ProductService,
  ) { }
  async create(createOrderDto: CreateOrderDto, createOrderDetailDto: CreateOrderDetailDto) {
    try {
      const client = createOrderDto.clientId ? await this.clientService.findOneById(createOrderDto.clientId) : null;
      const warehouse = createOrderDto.warehouseId ? await this.warehouseService.findOneById(createOrderDto.warehouseId) : null;
      const product = await this.productService.findOneById(createOrderDetailDto.productId);

      const { type, clientId, warehouseId } = createOrderDto;

      const newOrder = await this.orderRepository.save({
        type,
        clientId: client ? client.id : null,
        warehouseId: warehouse ? warehouse.id : null
      });

      const orderId = newOrder.id;

      let newInvoice: Invoice | undefined;
      if (type === 'ORDER') {
        newInvoice = await this.invoiceService.create({
          orderId,
        });
      }

      if (!product) {
        throw new BadRequestException('Invalid product information provided');
      }

      const { senderWarehouseId, productId, quantity, price } = createOrderDetailDto;
      const totalPrice = quantity * price;

      let receiverWarehouseId = null;
      if (newInvoice) {
        receiverWarehouseId = null;
      } else {
        receiverWarehouseId = warehouse.id;
      }
      
      const newOrderDetail = await this.orderDetailRepository.save({
        senderWarehouseId: warehouse.id,
        receiverWarehouseId,
        orderId: newOrder.id,
        productId: product.id,
        quantity,
        price,
        totalPrice,
      });
      

      return { newOrder, newInvoice, newOrderDetail };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating order');
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    if (orders.length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return orders;
  }

  async findOneById(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with id: ${id}, not found.`)
    }
    return order;
  }

  async update(id: string, attrs: Partial<Order>) {
    const order = await this.orderRepository.findOneBy({ id })
    if (!order) {
      throw new NotFoundException(`Order not found`);
    }
    Object.assign(order, attrs);
    await this.orderRepository.save(order);
    return order;

  }

  async remove(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order not found, try again.`);
    }
    if (order.type === 'ORDER') {
      const invoice = await this.invoiceService.findOne(order.id);
      const orderDetail = await this.orderDetailsService.findOneById(order.id);

      if (invoice) {
        await this.invoiceService.remove(invoice.id);
        invoice.deletedAt = new Date();
      }

      if (orderDetail) {
        await this.orderDetailsService.remove(orderDetail.id);
        orderDetail.deletedAt = new Date();
      }
    }

    order.deletedAt = new Date();
    await this.orderRepository.save(order);
    return order;
  }

  async permanentDelete(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    const invoice = await this.invoiceService.findOneBy(order.id);
    const orderDetail = await this.orderDetailsService.findOneById(order.id);

    if (!order) {
      throw new NotFoundException(`Order not found.`);
    }

    if (invoice) {
      await this.invoiceService.permanentDelete(invoice.orderId);
    }
    await this.orderDetailsService.permanentDelete(orderDetail.orderId);
    return await this.orderRepository.remove(order);

  }
}