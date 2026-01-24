import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/users/User.entity';
import { UserService } from 'src/users/user.service';
import SignInDTO from './DTOs/signin-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from './DTOs/register-user.dto';

export type LoginReponse = {
  user: Omit<User, 'password' | 'role' | 'isActive'>;
  accessToken: string;
};

export type RegisterResponse = {
  user: {
    id: string;
    email: string;
  };
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: SignInDTO): Promise<LoginReponse> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new BadRequestException('Email or password incorrect');
    const validPass = await bcrypt.compare(dto.password, user.password);

    if (!validPass)
      throw new BadRequestException('Email or password incorrect');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, role, isActive, ...result } = user;

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    if (!user.isActive) {
      await this.usersService.activateUser(user.id);
    }

    return { user: result, accessToken };
  }

  public async register(dto: RegisterUserDTO): Promise<RegisterResponse> {
    const user = await this.usersService.findByEmail(dto.email);
    if (user)
      throw new ConflictException('User with email provided already exists.');
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
    });

    return {
      user: newUser.user,
    };
  }
}
