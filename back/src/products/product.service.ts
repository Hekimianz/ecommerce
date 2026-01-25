import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import { Product } from './Product.entity';
import { CreateProductDTO } from './DTOs/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getAllProducts(name?: string): Promise<Product[]> {
    return await this.productsRepository.getAllProducts(name);
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productsRepository.getById(id);
    if (!product)
      throw new NotFoundException(
        `No product with an id of ${id} has been found`,
      );
    return product;
  }

  async createProduct(dto: CreateProductDTO): Promise<Product> {
    return await this.productsRepository.createProduct(dto);
  }
}
