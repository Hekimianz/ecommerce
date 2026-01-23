import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
