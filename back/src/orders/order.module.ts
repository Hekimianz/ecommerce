import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrdersRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Order.entity';
import { OrderItem } from './OrderItem.entity';
import { UserModule } from 'src/users/user.module';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    UserModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrdersRepository],
})
export class OrderModule {}
