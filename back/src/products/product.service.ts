import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}
}
