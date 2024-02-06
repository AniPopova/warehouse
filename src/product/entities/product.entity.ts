import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true})
  deletedAt: Date;
}
