import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

export enum OrderType {
  TRANSFER = 'TRANSFER',
  ORDER = 'ORDER',
  DELIVERY = 'DELIVERY'
}

@Entity('order')
@EventSubscriber()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrderType
  })
  type: OrderType;

  @Column({ name: 'client_id', type: 'uuid', nullable: false })
  clientId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {

  listenTo() {
    return Order;
  }

  async afterInsert(event: InsertEvent<Order>) {
    const order = event.entity;
    const orderDetail = event.entity;
    if (order.type === OrderType.ORDER) {
      const invoice = new Invoice();
      invoice.orderId = order.id;
      Invoice.save(invoice);
    }
  }

}