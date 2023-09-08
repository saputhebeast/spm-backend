import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeedbackDto {
  @IsString()
  @IsNotEmpty()
  reviews: number[];

  @IsNumber()
  @IsNotEmpty()
  description: number;
}
