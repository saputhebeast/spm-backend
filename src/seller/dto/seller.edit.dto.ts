import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class SellerEditDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  line1?: string;

  @IsString()
  @IsOptional()
  line2?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsNumber()
  slat: number;

  @IsNumber()
  slong: number;

  @IsString()
  @IsOptional()
  country?: string;
}
