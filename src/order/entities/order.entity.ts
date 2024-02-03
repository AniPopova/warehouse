import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';

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

  @Column({ name: 'client_id', type: 'uuid'})
  clientId: string;

  @Column({ name: 'client_id', type: 'uuid'})
  warehouseId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;
}

