import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from 'src/client/entities/client.entity'; 

export enum ProductType {
  LIQUID = 'LIQUID',
  NON_LIQUID = 'NON_LIQUID',
}

export enum UnitType {
  KILOGRAMS = 'kg',
  LITTERS = 'l',
}

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: false})
  name: string;

  @Column({
    type: 'enum',
    enum: ProductType
  })
  type: ProductType;

  @Column( {type: 'enum',
  enum: UnitType})
  unit: UnitType;

  @Column({ name: 'client_id', type: 'uuid', nullable: false})
  clientId: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true})
  deletedAt: Date;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'id' })
  client: Client;
}
