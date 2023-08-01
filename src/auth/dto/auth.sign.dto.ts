import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
