import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.user })
  role: Role;
}
