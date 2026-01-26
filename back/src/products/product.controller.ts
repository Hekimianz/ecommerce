import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/users/User.entity';
import { CreateProductDTO } from './DTOs/create-product.dto';
import { Product } from './Product.entity';
import { ChangeStockDTO } from './DTOs/change-stock.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAllProducts(
    @Query('name') name?: string,
  ): Promise<Product[]> {
    return await this.productService.getAllProducts(name);
  }

  @Get(':id')
  public async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Product> {
    return await this.productService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Post()
  public async createProduct(@Body() dto: CreateProductDTO): Promise<Product> {
    return await this.productService.createProduct(dto);
  }

  @Patch('/stock')
  public async changeStock(@Body() dto: ChangeStockDTO): Promise<Product> {
    return await this.productService.changeStock(dto);
  }
}
