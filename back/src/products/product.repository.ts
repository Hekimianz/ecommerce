import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './DTOs/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getAllProducts(name?: string): Promise<Product[]> {
    const qb = this.productsRepository.createQueryBuilder('product');
    if (name) {
      qb.where('product.name ILIKE :name', {
        name: `%${name}%`,
      });
    }
    return qb.getMany();
  }

  async getById(id: string): Promise<Product | null> {
    return await this.productsRepository.findOneBy({ id });
  }

  async createProduct(dto: CreateProductDTO): Promise<Product> {
    const newProduct = this.productsRepository.create(dto);
    return await this.productsRepository.save(newProduct);
  }
}
