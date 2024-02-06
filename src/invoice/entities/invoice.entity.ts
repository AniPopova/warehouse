import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Order } from 'src/order/entities/order.entity'

@Entity('invoice')
export class Invoice {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'inv_number', generated: 'increment' })
  invNumber: number;

  @Column({name: 'order_id', type: 'uuid', nullable: false})
  orderId: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true})
  deletedAt: Date;

  @JoinColumn({ name: 'order_id' })
  order: Order;
}
