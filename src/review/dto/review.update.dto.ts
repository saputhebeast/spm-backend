import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ReviewUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsBoolean()
  isActive = false;

  isDiscarded?: boolean;
  isPositive?: boolean;
  sentiment?: string;
  opinion?: string;
}
