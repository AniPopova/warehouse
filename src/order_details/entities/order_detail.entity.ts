import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, DeleteDateColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Warehouse } from "src/warehouse/entities/warehouse.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sender_warehouse_id', type: 'uuid', nullable: false})
  senderWarehouseId: string;

  @Column({ name: 'receiver_warehouse_id', type: 'uuid', nullable: false})
  receiverWarehouseId: string;

  @Column({ name: 'order_id', nullable: false})
  orderId: string;

  @Column({ name: 'product_id', type: 'uuid', nullable: false })
  productId: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({ name: 'total_price', type: 'numeric' })
  totalPrice: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true})
  deletedAt: Date;

  @JoinColumn({ name: 'sender_warehouse_id' })
  senderWarehouse: Warehouse;

  @JoinColumn({ name: 'receiver_warehouse_id' })
  receiverWarehouse: Warehouse;

  @JoinColumn({ name: 'order_id' })
  order: Order;

  @JoinColumn({ name: 'product_id' })
  product: Product;
}
