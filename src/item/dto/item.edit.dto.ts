import { Category } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}
