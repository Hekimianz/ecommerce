import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, LoginReponse, RegisterResponse } from './auth.service';
import SignInDTO from './DTOs/signin-user.dto';
import { RegisterUserDTO } from './DTOs/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() dto: SignInDTO): Promise<LoginReponse> {
    return await this.authService.login(dto);
  }

  @Post('register')
  public async register(
    @Body() dto: RegisterUserDTO,
  ): Promise<RegisterResponse> {
    return await this.authService.register(dto);
  }
}
