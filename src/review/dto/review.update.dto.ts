import { IsBoolean } from 'class-validator';

export class ReviewUpdateDto {
  @IsBoolean()
  isActive = false;

  isDiscarded?: boolean;
  isPositive?: boolean;
  sentiment?: string;
  opinion?: string;
}
