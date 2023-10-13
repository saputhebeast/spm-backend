import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewCreateDto, ReviewUpdateDto } from './dto';
import { Item, Preference, Review } from '@prisma/client';
import { analyse } from './review.analyses.service';
import { PreferenceRepository } from '../preference/preference.repository';
import { ItemRepository } from '../item/item.repository';
import { PreferenceCreateDtoToPreferenceDtoMapper } from '../common/mapper';

@Injectable({ scope: Scope.DEFAULT })
export class ReviewService {
  private readonly logger: Logger = new Logger(ReviewService.name);

  constructor(
    private reviewRepository: ReviewRepository,
    private preferenceRepository: PreferenceRepository,
    private itemRepository: ItemRepository,
  ) {}

  async saveReview(userId: number, reviewCreateDto: ReviewCreateDto) {
    this.logger.log(`createReview: execution started by user- ${userId}`);

    const reviewExists: Review =
      await this.reviewRepository.getReviewsByItemIdOfCurrentUser(
        userId,
        reviewCreateDto.itemId,
      );
    if (reviewExists) {
      throw new InternalServerErrorException('Review found already');
    }

    const review: Review = await this.reviewRepository.saveReview(
      userId,
      reviewCreateDto,
    );
    if (!review) {
      throw new InternalServerErrorException('Review not saved');
    }
    return review;
  }

  async updateReview(
    userId: number,
    reviewId: number,
    reviewUpdateDto: ReviewUpdateDto,
  ) {
    this.logger.log(`updateReview: execution started by user- ${userId}`);

    const review: Review = await this.getReviewById(userId, reviewId);
    reviewUpdateDto.isActive =
      review.isActive == true ? true : reviewUpdateDto.isActive;

    const updatedReview: Review = await this.reviewRepository.updateReview(
      reviewId,
      reviewUpdateDto,
    );

    if (!updatedReview) {
      throw new InternalServerErrorException('Failed to update the review');
    }

    return updatedReview;
  }

  async deleteReview(userId: number, reviewId: number) {
    this.logger.log(`deleteReview: execution started by user- ${userId}`);

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

  async getReviewsByItemIdOfCurrentUser(userId: number, itemId: number) {
    this.logger.log(
      `getReviewsByItemIdOfCurrentUser: execution started by user- ${userId}`,
    );

    const reviews: Review =
      await this.reviewRepository.getReviewsByItemIdOfCurrentUser(
        userId,
        itemId,
      );
    if (!reviews) {
      throw new NotFoundException('No Review found');
    }

    return reviews;
  }

  async getReviewsOfCurrentUser(userId: number) {
    this.logger.log(
      `getReviewsOfCurrentUser: execution started by user- ${userId}`,
    );

    const reviews: Review[] =
      await this.reviewRepository.getReviewsOfCurrentUser(userId);
    if (!reviews) {
      throw new NotFoundException('No Review found');
    }

    return reviews;
  }

  async analyse(userId: number, reviewId: number) {
    const review: Review = await this.reviewRepository.getReviewById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found to analyse.');
    }
    const item: Item = await this.itemRepository.getItemById(review.itemId);

    const preference: Preference =
      await this.preferenceRepository.getPreferenceByUserId(userId);
    if (!preference) {
      throw new NotFoundException('Preferences not set yet to analyse.');
    }
    const result = await analyse(preference, review, item);
    if (result !== null) {
      const reviewToUpdate = result.review;
      reviewToUpdate.isActive = true;
      reviewToUpdate.isDiscarded = false;
      const preferenceToUpdate = result.updatePreference;

      console.log(reviewToUpdate);
      console.log(preferenceToUpdate);

      const updatedReview: Review = await this.updateReview(
        userId,
        reviewId,
        reviewToUpdate,
      );
      const updatedPreference: Preference =
        await this.preferenceRepository.updatePreference(
          userId,
          PreferenceCreateDtoToPreferenceDtoMapper(userId, preferenceToUpdate),
        );
      console.log('updatedReview');
      console.log(updatedReview);
      console.log('updatedPreference');
      console.log(updatedPreference);
      return updatedReview;
    } else {
      throw new NotFoundException('Failed to analyse review');
    }
  }
}
