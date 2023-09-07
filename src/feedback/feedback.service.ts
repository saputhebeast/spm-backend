import { Injectable, Logger } from '@nestjs/common';
import { FeedbackDto, FeedbackResponseDto } from './dto';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
  private readonly logger: Logger = new Logger(FeedbackService.name);

  constructor(private feedbackRepository: FeedbackRepository) {}

  async createFeedbackBySubscriptionBoxId(
    subscriptionBoxId: number,
    feedbackDto: FeedbackDto,
  ): Promise<FeedbackResponseDto> {
    return null;
  }
}
