import { IsNotEmpty, IsNumber } from 'class-validator';

export class FeedbackUserDto {
  @IsNumber()
  @IsNotEmpty()
  subscriptionBoxId: number;

  @IsNotEmpty()
  description: string;
}
