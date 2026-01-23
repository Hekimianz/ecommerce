import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}
