import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ReviewUpdateDto {
  @IsBoolean()
  isActive: boolean;
  @IsNotEmpty()
  isDiscarded?: boolean;
  isPositive?: boolean;
  sentiment?: string;
  opinion?: string;
  @IsNotEmpty()
  description: string;
}
