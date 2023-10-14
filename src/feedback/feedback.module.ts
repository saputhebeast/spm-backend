import { Module } from '@nestjs/common';
import { FeedbackController } from 'src/feedback/feedback.controller';
import { FeedbackService } from 'src/feedback/feedback.service';
import { FeedbackRepository } from 'src/feedback/feedback.repository';
import { SubscriptionBoxRepository } from '../subscription-box/subscription-box.repository';
import { UserRepository } from '../user/user.repository';
import { ReviewRepository } from '../review/review.repository';

@Module({
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    FeedbackRepository,
    SubscriptionBoxRepository,
    UserRepository,
    ReviewRepository,
  ],
})
export class FeedbackModule {}
