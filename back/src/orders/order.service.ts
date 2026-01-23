import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
}
