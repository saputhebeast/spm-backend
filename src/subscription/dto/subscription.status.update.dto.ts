import { IsNotEmpty } from 'class-validator';
import { SubscriptionStatus } from '@prisma/client';

export class SubscriptionStatusUpdateDto {
  @IsNotEmpty()
  status?: SubscriptionStatus;
}
