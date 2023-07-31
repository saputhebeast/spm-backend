import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '@prisma/client';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: User['role'];
}
