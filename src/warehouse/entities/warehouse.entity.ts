import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from 'src/client/entities/client.entity'; 
import { ProductType } from 'src/product/entities/product.entity';


@Entity('warehouse')
export class Warehouse {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: ProductType
  })
  type: ProductType;

  @Column({ name: 'client_id' , type: 'uuid', nullable: false})
  clientId: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true})
  deletedAt: Date;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
