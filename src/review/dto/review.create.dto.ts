import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ReviewCreateDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsNotEmpty()
  @IsNumber()
  feedbackId: number;
}
