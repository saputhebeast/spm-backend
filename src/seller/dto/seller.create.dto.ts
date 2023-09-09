import { IsEmail, IsNotEmpty, IsString, IsNumber , IsOptional } from 'class-validator';

export class SellerCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  line1: string;

  @IsOptional()
  line2: string;

  @IsOptional()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  slat: number;

  @IsNumber()
  slong: number;

  @IsString()
  @IsNotEmpty()
  country: string;
}
