import { Category } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

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
