import { IsNotEmpty, IsNumber } from 'class-validator';

export class FeedbackUserDto {
  @IsNumber()
  @IsNotEmpty()
  subscriptionBoxId: number;

  @IsNumber()
  @IsNotEmpty()
  description: string;
}
