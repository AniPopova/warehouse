import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Warehouse } from "src/warehouse/entities/warehouse.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'warehouse_id', type: 'uuid', nullable: false})
  warehouseId: string;

  @Column({ name: 'order_id', type: 'uuid', nullable: false})
  orderId: string;

  @Column({ name: 'product_id', type: 'uuid', nullable: false })
  productId: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({ name: 'total_price',  type: 'numeric' })
  get totalPrice(): number {
    return this.quantity * this.price;
  }

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true})
  deletedAt: Date;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

}
