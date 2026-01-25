import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role, User } from './User.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { AuthUser } from 'src/auth/jwt.strategy';
import { Roles, RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async findAll(): Promise<Omit<User, 'password' | 'role'>[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    return await this.userService.findOne(id);
  }

  @Get('email/:email')
  public async findByEmail(
    @Param('email') email: string,
  ): Promise<User | null> {
    return await this.userService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Patch('admin/:id')
  public async makeAdmin(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    return await this.userService.makeAdmin(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('delete/:id')
  public async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: Request & { user: AuthUser },
  ): Promise<string> {
    return await this.userService.deleteUser(id, req.user.userId);
  }
}
