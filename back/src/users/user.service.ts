import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import UsersRepository from './user.repository';
import { Role, User } from './User.entity';
import { RegisterUserDTO } from 'src/auth/DTOs/register-user.dto';
import { RegisterResponse } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.usersRepository.findAll();
  }

  public async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne(id);
    if (!user)
      throw new NotFoundException(`No user with an ID of ${id} has been found`);
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  public async create(dto: RegisterUserDTO): Promise<RegisterResponse> {
    return await this.usersRepository.create(dto);
  }

  public async makeAdmin(id: string): Promise<string> {
    const user = await this.findOne(id);
    if (user.role !== Role.user)
      throw new ConflictException('User is already an admin.');
    return await this.usersRepository.makeAdmin(user);
  }

  public async deleteUser(targetId: string, reqId: string): Promise<string> {
    const user = await this.findOne(targetId);
    if (targetId !== reqId)
      throw new ForbiddenException('You can only delete your own account');
    if (!user.isActive) throw new BadRequestException(`User doesnt exist.`);
    return await this.usersRepository.deleteUser(user);
  }

  public async activateUser(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user.isActive) throw new ConflictException('User is not deactivated');
    await this.usersRepository.activateUser(user);
  }
}
