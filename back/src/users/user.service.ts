import { Injectable, NotFoundException } from '@nestjs/common';
import UsersRepository from './user.repository';
import { User } from './User.entity';
import { RegisterUserDTO } from 'src/auth/DTOs/register-user.dto';
import { RegisterResponse } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user)
      throw new NotFoundException(`No user with an ID of ${id} has been found`);
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);
    return user;
  }

  public async create(dto: RegisterUserDTO): Promise<RegisterResponse> {
    return await this.usersRepository.create(dto);
  }
}
