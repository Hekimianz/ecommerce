import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { UserService } from 'src/users/user.service';
import { Order, OrderStatus } from './Order.entity';
import { ProductService } from 'src/products/product.service';
import { CreateOrderDTO } from './DTOs/create-order.dto';
import { OrderItem } from './OrderItem.entity';
import { Operations } from 'src/products/DTOs/change-stock.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersService: UserService,
    private readonly productsService: ProductService,
  ) {}

  async getAllFromUser(id: string): Promise<Order[]> {
    const user = await this.usersService.findOne(id);
    return this.ordersRepository.getAllFromUser(user);
  }

  async createOrder(userId: string, dto: CreateOrderDTO): Promise<Order> {
    const user = await this.usersService.findOne(userId);

    const productIds = dto.items.map((i) => i.productId);
    const products = await this.productsService.getManyByIds(productIds);

    if (productIds.length !== products.length) {
      const found = new Set(products.map((p) => p.id));
      const missing = productIds.filter((id) => !found.has(id));
      throw new NotFoundException(`Missing products: ${missing.join(', ')}`);
    }

    const qtyById = new Map(dto.items.map((i) => [i.productId, i.quantity]));

    const items: OrderItem[] = products.map((product): OrderItem => {
      const quantity = qtyById.get(product.id)!;

      if (product.stock < quantity) {
        throw new BadRequestException(
          `Not enough stock for "${product.name}". Available: ${product.stock}, requested: ${quantity}`,
        );
      }

      return this.ordersRepository.createOrderItem(
        product,
        quantity,
        product.price,
      );
    });

    const totalNum = items.reduce((sum, item) => {
      const priceNum =
        typeof item.price === 'string' ? Number(item.price) : item.price;
      return sum + priceNum * item.quantity;
    }, 0);

    const order = await this.ordersRepository.createOrder(
      user,
      items,
      OrderStatus.PENDING,
      +totalNum.toFixed(2),
    );
    for (const product of products) {
      await this.productsService.changeStock({
        productId: product.id,
        amount: qtyById.get(product.id)!,
        operation: Operations.sub,
      });
    }

    return order;
  }
}
