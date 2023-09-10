import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReviewCreateDto {
  @IsNotEmpty()
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
