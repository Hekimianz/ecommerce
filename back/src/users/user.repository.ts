import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from './User.entity';
import { RegisterUserDTO } from 'src/auth/DTOs/register-user.dto';
import { RegisterResponse } from 'src/auth/auth.service';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...safeUser }) => safeUser);
  }

  public async findOne(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;
    return safeUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  public async create(dto: RegisterUserDTO): Promise<RegisterResponse> {
    const newUser = this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);
    return {
      user: { id: newUser.id, email: newUser.email },
    };
  }

  public async makeAdmin(user: Omit<User, 'password'>): Promise<string> {
    user.role = Role.admin;
    await this.usersRepository.save(user);
    return `User: ${user.email} is now an admin.`;
  }

  public async deleteUser(user: Omit<User, 'password'>): Promise<string> {
    user.isActive = false;
    await this.usersRepository.save(user);
    return `User: ${user.email} has been deleted.`;
  }

  public async activateUser(user: Omit<User, 'password'>): Promise<void> {
    user.isActive = true;
    await this.usersRepository.save(user);
  }
}
