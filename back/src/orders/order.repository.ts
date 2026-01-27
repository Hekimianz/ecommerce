import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './Order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/User.entity';
import { OrderItem } from './OrderItem.entity';
import { Product } from 'src/products/Product.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  async getAllFromUser(user: Omit<User, 'password'>): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: { user: { id: user.id } },
    });
  }

  createOrderItem(
    product: Product,
    quantity: number,
    price: number,
  ): OrderItem {
    return this.orderItemsRepository.create({ product, quantity, price });
  }

  async createOrder(
    user: Omit<User, 'password'>,
    items: OrderItem[],
    status: OrderStatus,
    total: number,
  ): Promise<Order> {
    const order = this.ordersRepository.create({ user, items, status, total });
    return await this.ordersRepository.save(order);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return await this.ordersRepository.findOneBy({ id });
  }

  async payOrder(order: Order): Promise<Order> {
    order.status = OrderStatus.PAID;
    return await this.ordersRepository.save(order);
  }

  async cancelOrder(order: Order): Promise<Order> {
    order.status = OrderStatus.CANCELLED;
    return await this.ordersRepository.save(order);
  }
}
