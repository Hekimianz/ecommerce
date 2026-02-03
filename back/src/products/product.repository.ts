import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDTO } from './DTOs/create-product.dto';
import { ChangeStockDTO, Operations } from './DTOs/change-stock.dto';

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

  async getFeatured(): Promise<Product[]> {
    return await this.productsRepository.find({ where: { isFeatured: true } });
  }

  async createProduct(dto: CreateProductDTO): Promise<Product> {
    const newProduct = this.productsRepository.create(dto);
    return await this.productsRepository.save(newProduct);
  }

  async changeStock(dto: ChangeStockDTO, product: Product): Promise<Product> {
    if (dto.operation === Operations.add) {
      product.stock += dto.amount;
    } else if (
      dto.operation === Operations.sub &&
      product.stock - dto.amount < 0
    ) {
      throw new BadRequestException(
        "The product doesn't have sufficient stock for this operation",
      );
    } else {
      product.stock -= dto.amount;
    }

    return await this.productsRepository.save(product);
  }

  async getManyByIds(ids: string[]): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { id: In(ids) },
    });
  }
}
