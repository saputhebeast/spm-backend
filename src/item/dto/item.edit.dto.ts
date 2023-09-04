import { Category } from '@prisma/client';
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

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
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  outdoor: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  size: string;

  @IsString()
  @IsOptional()
  material: string;

  @IsString()
  @IsOptional()
  tags: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsNumber()
  @IsOptional()
  rating: number;
}
