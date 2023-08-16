import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class PackageCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  period: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsString()
  description?: string;

  @IsString()
  image?: string;
}
