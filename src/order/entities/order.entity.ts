import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, EventSubscriber } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
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

  @Column({ name: 'warehouse_id', type: 'uuid'})
  warehouseId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @JoinColumn({ name: 'client_id' })
  client: Client;

  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;
}

