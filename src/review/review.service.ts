import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewCreateDto, ReviewUpdateDto } from './dto';
import { Review } from '@prisma/client';

@Injectable({ scope: Scope.DEFAULT })
export class ReviewService {
  private readonly logger: Logger = new Logger(ReviewService.name);

  constructor(private reviewRepository: ReviewRepository) {}

  async saveReview(userId: number, reviewCreateDto: ReviewCreateDto) {
    this.logger.log(`createReview: execution started by user- ${userId}`);

    const review: Review =
      await this.reviewRepository.saveReview(reviewCreateDto);
    if (!review) {
      throw new InternalServerErrorException('Review not saved');
    }
    return review;
  }

  async updateReview(userId: number, reviewUpdateDto: ReviewUpdateDto) {
    this.logger.log(`updateReview: execution started by user- ${userId}`);

    await this.getReviewById(userId, reviewUpdateDto.id);

    const updatedReview: Review =
      await this.reviewRepository.updateReview(reviewUpdateDto);

    if (!updatedReview) {
      throw new InternalServerErrorException('Failed to update the review');
    }

    return updatedReview;
  }

  async deleteReview(userId: number, reviewId: number) {
    this.logger.log(`deletePackage: execution started by user- ${userId}`);

    await this.getReviewById(userId, reviewId);

    const reviewToDelete: Review =
      await this.reviewRepository.deleteReviewById(reviewId);
    if (!reviewToDelete) {
      throw new InternalServerErrorException('Failed to delete the review');
    }
    return reviewToDelete;
  }

  async getReviewById(userId: number, reviewId: number) {
    this.logger.log(`getReviewById: execution started by user- ${userId}`);

    const review: Review = await this.reviewRepository.getReviewById(reviewId);
    if (!review) {
      throw new NotFoundException('No Review found');
    }
    return review;
  }

  async getAllReviews(userId: number) {
    this.logger.log(`getAllReviews: execution started by user- ${userId}`);

    const review: Review[] = await this.reviewRepository.getAllReviews();
    if (!review) {
      throw new NotFoundException('No Review found');
    }
    return review;
  }

  async getReviewsByFeedbackId(userId: number, feedbackId: number) {
    this.logger.log(
      `getReviewsByFeedbackId: execution started by user- ${userId}`,
    );

    const reviews: Review[] =
      await this.reviewRepository.getReviewsByFeedbackId(feedbackId);
    if (!reviews) {
      throw new NotFoundException('No Review found');
    }
    return reviews;
  }

  async getReviewsByItemId(userId: number, itemId: number) {
    this.logger.log(`getReviewsByItemId: execution started by user- ${userId}`);

    const reviews: Review[] =
      await this.reviewRepository.getReviewsByItemId(itemId);
    if (!reviews) {
      throw new NotFoundException('No Review found');
    }
    return reviews;
  }
}