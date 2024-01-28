import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { InvoiceService } from 'src/invoice/invoice.service';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { OrderDetailsService } from 'src/order_details/order_details.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>,
    
    private readonly invoiceService: InvoiceService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly logger: Logger,
  ) {}

  // async create(
  //   createOrderDto: CreateOrderDto,
  //   createOrderDetailDto: CreateOrderDetailDto,
  //   createInvoiceDto?: CreateInvoiceDto
  // ) {
  //   try {
  //     const { type, clientId } = createOrderDto;
  //     const newOrder = await this.orderRepository.save({
  //       type,
  //       clientId,
  //     });
  
  //     const { warehouseId, productId, quantity, price } = createOrderDetailDto;
  //     const totalPrice = quantity * price;
  
  //     const newOrderDetail = await this.orderDetailsRepository.save({
  //       warehouseId,
  //       orderId: newOrder.id,
  //       productId,
  //       quantity,
  //       price,
  //       totalPrice
  //     });
  //     this.orderDetailsService.create(createOrderDetailDto);

  //     if (type === 'ORDER') {

  //       const newInvoice = await this.invoiceRepository.save({
  //         orderId: newOrder.id,
  //       });

  //       if (createInvoiceDto) {
  //         await this.invoiceService.createInvoice(createInvoiceDto);
  //       }
  //       return { order: newOrder, orderDetail: newOrderDetail, invoice: newInvoice };
  //     }

  //     return { order: newOrder, orderDetail: newOrderDetail };
  //   } catch (error) {
  //     throw this.logger.error('Failure in creating order.', error);
  //   }
  // }

  // async create(
  //   createOrderDto: CreateOrderDto,
  //   createOrderDetailDto: CreateOrderDetailDto,
  //   createInvoiceDto: CreateInvoiceDto
  // ) {
  //   try {
  //     const { type, clientId } = createOrderDto;
  //     const newOrder = await this.orderRepository.save({
  //       type,
  //       clientId,
  //     });
  //    await this.orderRepository.create(newOrder);
      
  //     console.log('New Order ID:', newOrder.id);
  
  //     const { warehouseId,  productId, quantity, price } = createOrderDetailDto;
  //     const totalPrice = quantity * price;
  
  //     const newOrderDetail = await this.orderDetailsRepository.save({
  //       warehouseId,
  //       orderId: newOrder.id, 
  //       productId,
  //       quantity,
  //       price,
  //       totalPrice,
  //     });

  //     await this.orderDetailsService.create(createOrderDetailDto);
  
  //     if (newOrder.type === 'ORDER') {
  //       const { orderId } = createInvoiceDto;
  //       const newInvoice = await this.invoiceRepository.save({
  //         orderId: newOrder.id,
  //       });
  // await this.invoiceService.create(createInvoiceDto);
  //       if (newInvoice) {
          
  //         console.log(newInvoice.invNumber);
          
  //       }
  //       return { invoice: newInvoice };
  //     }
  
  //     return { newOrder };
  //   } catch (error) {

  //     console.error('Error in creating order:', error);
  //     throw this.logger.error('Failure in creating order.', error);
  //   }
  // }
  
  async create(
    createOrderDto: CreateOrderDto,
    createOrderDetailDto: CreateOrderDetailDto,
    createInvoiceDto: CreateInvoiceDto
  ) {
    try {
      const { type, clientId } = createOrderDto;
      const newOrder = await this.orderRepository.save({
        type,
        clientId,
      });
  
      console.log('New Order ID:', newOrder.id, newOrder.type);

        
      if (newOrder.type === 'ORDER') {
        const { orderId } = createInvoiceDto;
        const newInvoice = await this.invoiceRepository.save({
          orderId: newOrder.id,
        });
  
        await this.invoiceService.create(createInvoiceDto);
        
        const { warehouseId, productId, quantity, price } = createOrderDetailDto;
        const totalPrice = quantity * price;
    
        const newOrderDetail = await this.orderDetailsRepository.save({
          warehouseId,
          orderId: newOrder.id,
          productId,
          quantity,
          price,
          totalPrice,
        });
        await this.orderDetailsService.create(createOrderDetailDto);
      
      }
  
      const { warehouseId, productId, quantity, price } = createOrderDetailDto;
      const totalPrice = quantity * price;
  
      const newOrderDetail = await this.orderDetailsRepository.save({
        warehouseId,
        orderId: newOrder.id,
        productId,
        quantity,
        price,
        totalPrice,
      });
  
      await this.orderDetailsService.create(createOrderDetailDto);
      
      return { order: newOrder };
    } catch (error) {
      console.error('Error in creating order:', error);
    }
  }


  async findAll(){
    const orders =  this.orderRepository.find();
    if ((await orders).length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return orders;
  }

  async findOneById(id: string) {
     const order = await this.orderRepository.findOneBy({id});
     if (!order) {
      throw new NotFoundException(`Order with id: ${id}, not found.`)
    }
     return order;
  }

  async update(id: string, attrs: Partial<Order>) {
    try {
      const order = await this.orderRepository.findOneBy({id})
     if(!order){
      throw new NotFoundException(`Order with such id:${id} not found`);
     }
     Object.assign(order, attrs);
      await this.orderRepository.save(order);
      return order;
    } catch (error) {
      this.logger.error('Failure to update order:', error);
    }
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException(`Order not found, try again.`);
      }
      if (order.type === 'ORDER') {
        const invoice = await this.invoiceRepository.findOneBy({ orderId: order.id });
        const orderDetail = await this.orderDetailsRepository.findOneBy({orderId: order.id});

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
      return `Order removed successfully`;
    } catch (error) {
      this.logger.error('Error during deleting order.', error);
    }
  }

  async permanentDelete(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      const invoice = await this.invoiceService.findOne(order.id);
      const orderDetail = this.orderDetailsService.findOneById(order.id);
  
      if (!order) {
        throw new NotFoundException(`Order not found.`);
      }
  
      if (invoice ) {
        await this.invoiceService.permanentDelete(invoice.orderId);
      }
      await this.orderDetailsService.permanentDelete((await orderDetail).orderId);
      return await this.orderRepository.remove(order);
    } catch (error) {
      this.logger.error('Error during permanent delete.', error);
    }
  }
}