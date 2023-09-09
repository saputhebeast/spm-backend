import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FeedbackUserDto, FeedbackResponseDto, FeedbackUpdateDto } from './dto';
import { FeedbackRepository } from './feedback.repository';
import { Feedback, Review, SubscriptionBox, User } from '@prisma/client';
import { SubscriptionBoxRepository } from '../subscription-box/subscription-box.repository';
import { FeedbackToFeedbackResponseDtoMapper } from '../common/mapper';
import { UserRepository } from '../user/user.repository';
import { ReviewRepository } from '../review/review.repository';
import { ReviewResponseDto } from '../review/dto';

@Injectable()
export class FeedbackService {
  private readonly logger: Logger = new Logger(FeedbackService.name);

  constructor(
    private feedbackRepository: FeedbackRepository,
    private subscriptionBoxRepository: SubscriptionBoxRepository,
    private userRepository: UserRepository,
    private reviewRepository: ReviewRepository,
  ) {}

  async createFeedbackBySubscriptionBoxId(
    userId: number,
    feedbackDto: FeedbackUserDto,
  ) {
    this.logger.log(
      `createFeedbackBySubscriptionBoxId: execution started by user- ${userId}`,
    );

    const subscriptionBox: SubscriptionBox =
      await this.subscriptionBoxRepository.findSubscriptionBoxById(
        feedbackDto.subscriptionBoxId,
      );
    if (subscriptionBox.userId != userId) {
      throw new UnauthorizedException(
        "Subscription box's user Id does not match with you",
      );
    }

    const feedback: Feedback = await this.feedbackRepository.saveFeedback(
      feedbackDto,
    );
    if (!feedback) {
      throw new InternalServerErrorException('Feedback not saved');
    }
    return feedback;
  }

  async updateFeedbackByFeedbackId(
    userId: number,
    feedbackId: number,
    dto: FeedbackUpdateDto,
  ) {
    this.logger.log(
      `updateFeedbackBySubscriptionBoxId: execution started by user- ${userId}`,
    );

    const feedbackToUpdate: Feedback =
      await this.feedbackRepository.getFeedbackById(feedbackId);
    const subscriptionBox: SubscriptionBox =
      await this.subscriptionBoxRepository.findSubscriptionBoxById(
        feedbackToUpdate.subscriptionBoxId,
      );
    if (subscriptionBox.userId != userId) {
      throw new UnauthorizedException(
        "Subscription box's user Id does not match with you",
      );
    }

    dto.outcome = dto.outcome == null ? feedbackToUpdate.outcome : dto.outcome;

    dto.result = dto.result == null ? feedbackToUpdate.result : dto.result;

    dto.isSubmitted =
      feedbackToUpdate.isSubmitted == true ? true : dto.isSubmitted;

    dto.isSubscriptionCancelled =
      feedbackToUpdate.isSubscriptionCancelled == true
        ? true
        : dto.isSubscriptionCancelled;

    const feedback: Feedback = await this.feedbackRepository.updateFeedback(
      feedbackId,
      dto,
    );
    if (!feedback) {
      throw new InternalServerErrorException('Failed to update Feedback');
    }
    return feedback;
  }

  async deleteFeedbackBySubscriptionBoxId(userId: number, boxId: number) {
    this.logger.log(
      `deleteFeedbackBySubscriptionBoxId: execution started by user- ${userId}`,
    );

    await this.getFeedbackBySubscriptionBoxId(userId, boxId);

    const feedbackToDelete: Feedback =
      await this.feedbackRepository.deleteFeedbackBySubscriptionBoxId(boxId);
    if (!feedbackToDelete) {
      throw new InternalServerErrorException('Failed to delete the feedback');
    }
    return feedbackToDelete;
  }

  async deleteFeedbackByFeedbackId(userId: number, feedbackId: number) {
    this.logger.log(
      `deleteFeedbackByFeedbackId: execution started by user- ${userId}`,
    );

    await this.getFeedbackById(userId, feedbackId);

    const feedbackToDelete: Feedback =
      await this.feedbackRepository.deleteFeedbackById(feedbackId);
    if (!feedbackToDelete) {
      throw new InternalServerErrorException('Failed to delete the feedback');
    }
    return feedbackToDelete;
  }

  async getFeedbackById(userId: number, feedbackId: number) {
    this.logger.log(`getFeedbackById: execution started by user- ${userId}`);

    const feedback: Feedback = await this.feedbackRepository.getFeedbackById(
      feedbackId,
    );
    if (!feedback) {
      throw new NotFoundException('No feedback found');
    }
    return feedback;
  }

  async getFeedbackBySubscriptionBoxId(userId: number, boxId: number) {
    this.logger.log(
      `getFeedbackBySubscriptionBoxId: execution started by user- ${userId}`,
    );

    const feedback: Feedback =
      await this.feedbackRepository.getFeedbackBySubscriptionBoxId(boxId);
    if (!feedback) {
      throw new NotFoundException('No feedback found');
    }
    return feedback;
  }

  async getAllFeedbacks(userId: number) {
    this.logger.log(`getAllFeedbacks: execution started by user- ${userId}`);

    const feedbacks: Feedback[] =
      await this.feedbackRepository.getAllFeedbacks();
    if (!feedbacks) {
      throw new NotFoundException('No Feedbacks found');
    }
    return feedbacks;
  }

  async getFeedbackDetailedResponseById(userId: number, feedbackId: number) {
    const feedback: Feedback = await this.feedbackRepository.getFeedbackById(
      feedbackId,
    );
    const subscriptionBox: SubscriptionBox =
      await this.subscriptionBoxRepository.findSubscriptionBoxById(
        feedback.subscriptionBoxId,
      );
    const user: User = await this.userRepository.findUserById(userId);
    const reviews: Review[] =
      await this.reviewRepository.getReviewsByFeedbackId(feedbackId);
    return FeedbackToFeedbackResponseDtoMapper(
      feedback,
      subscriptionBox,
      user,
      reviews,
    );
  }
}
