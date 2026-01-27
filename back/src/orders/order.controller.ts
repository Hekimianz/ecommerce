import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './Order.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { AuthUser, JwtPayload } from 'src/auth/jwt.strategy';
import { CreateOrderDTO } from './DTOs/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('user/:id')
  public async getAllFromUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Order[]> {
    return await this.orderService.getAllFromUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createOrder(
    @Req() req: Request & { user: JwtPayload },
    @Body() dto: CreateOrderDTO,
  ): Promise<Order> {
    return await this.orderService.createOrder(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('pay/:id')
  public async payOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: Request & { user: AuthUser },
  ): Promise<Order> {
    return await this.orderService.payOrder(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('cancel/:id')
  public async cancelOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: Request & { user: AuthUser },
  ): Promise<Order> {
    return await this.orderService.cancelOrder(id, req.user.userId);
  }
}
