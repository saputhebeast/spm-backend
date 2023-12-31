import { Category } from '@prisma/client';
import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

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

  @IsDate()
  @IsOptional()
  demandweek: Date;

  @IsNumber()
  @IsOptional()
  demand: number;

  @IsNumber()
  @IsOptional()
  demandCounter: number;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
