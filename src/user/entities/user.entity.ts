import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Unique } from 'typeorm';

export enum UserRights {
  OWNER = 'OWNER',
  OPERATOR = 'OPERATOR',
  VIEWER = 'VIEWER',
}

@Entity('user')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false})
  username: string;

  @Column({ type: 'varchar', nullable: false})
  password: string;

  @Column({
    name: 'user_role',
    type: 'enum',
    enum: UserRights,
    default: UserRights.VIEWER,
    nullable: false
  })
  userRole: UserRights;

  @Column({ type: 'varchar'})
  email: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', nullable: true})
  deletedAt: Date;
  
}
