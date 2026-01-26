import { Order } from 'src/orders/Order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  admin = 'admin',
  user = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.user })
  role: Role;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
