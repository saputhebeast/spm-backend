import { Feedback, Review, SubscriptionBox, User } from '@prisma/client';
import { FeedbackResponseDto } from 'src/feedback/dto';

export function FeedbackToFeedbackResponseDtoMapper(
  feedback: Feedback,
  subscriptionBox: SubscriptionBox,
  user: User,
  reviews: Review[],
): FeedbackResponseDto {
  const response = new FeedbackResponseDto();
  response.id = feedback.id;
  response.result = feedback.result;
  response.isSubscriptionCancelled = feedback.isSubscriptionCancelled;
  response.isSubmitted = feedback.isSubmitted;
  response.outcome = feedback.outcome;
  response.createdAt = feedback.createdAt;
  response.updatedAt = feedback.updatedAt;
  response.subscriptionBox = subscriptionBox;
  response.user = user;
  response.review = reviews;
  return response;
}
