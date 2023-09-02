import { Category } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ItemEditDto {
  @IsString()
  @IsOptional()
  itemName?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsOptional()
  category?: Category;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  sellerId?: number;

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
