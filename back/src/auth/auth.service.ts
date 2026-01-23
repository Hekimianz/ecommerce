import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}
}
