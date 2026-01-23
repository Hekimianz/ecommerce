import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './User.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Get('email/:email')
  public async findByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findByEmail(email);
  }
}
