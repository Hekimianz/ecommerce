import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/jwt.strategy';

@Controller('me')
export class MeController {
  @UseGuards(JwtAuthGuard)
  @Get()
  public getMe(@Req() req: Request & { user: JwtPayload }) {
    return req.user;
  }
}
