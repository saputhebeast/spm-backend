import { Review } from '@prisma/client';

export class FeedbackResponseDto {
  id: number;
  result: string | null;
  isSubscriptionCancelled: boolean;
  description: string;
  isSubmitted: boolean;
  outcome: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  subscriptionBox: {
    id: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
  };
  review: Review[];
}
