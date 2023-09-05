import { Category } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ItemCreateDto {
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: Category;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  sellerId: number;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  outdoor: string;

  @IsString()
  gender: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  material: string;

  @IsString()
  tags: string;

  @IsString()
  color: string;

  @IsNumber()
  rating: number;
}
