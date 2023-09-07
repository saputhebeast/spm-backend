import { Module } from '@nestjs/common';
import { FeedbackController } from 'src/feedback/feedback.controller';
import { FeedbackService } from 'src/feedback/feedback.service';
import { FeedbackRepository } from 'src/feedback/feedback.repository';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
})
export class FeedbackModule {}
