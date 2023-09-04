import { SubscriptionStatus } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubscriptionCreateDto {
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  status: SubscriptionStatus;

  @IsNumber()
  @IsNotEmpty()
  paymentId: number;

  @IsNumber()
  @IsNotEmpty()
  packageId: number;
}
