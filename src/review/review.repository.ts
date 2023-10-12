import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewCreateDto, ReviewUpdateDto } from './dto';

@Injectable({ scope: Scope.DEFAULT })
export class ReviewRepository {
  constructor(private prisma: PrismaService) {}

  async saveReview(userId: number, dto: ReviewCreateDto) {
    return this.prisma.review.create({
      data: {
        userId: userId,
        itemId: dto.itemId,
        feedBackId: dto.feedbackId,
        rating: dto.rating,
        description: dto.description,
        isActive: true,
      },
      include: {
        feedback: true,
        item: true,
      },
    });
  }

  async updateReview(reviewId: number, dto: ReviewUpdateDto) {
    return this.prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        isPositive: dto.isPositive,
        isReviewDiscarded: dto.isDiscarded,
        opinion: dto.opinion,
        sentiment: dto.sentiment,
        isActive: dto.isActive,
        description: dto.description,
      },
    });
  }

  async deleteReviewById(reviewId: number) {
    return this.prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
  }

  // async deleteReviewById(reviewId: number) {
  //   return this.prisma.review.update({
  //     where: {
  //       id: reviewId,
  //     },
  //     data: {
  //       isActive: false,
  //     },
  //   });
  // }

  async getReviewById(reviewId: number) {
    return this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
  }

  async getAllReviews() {
    return this.prisma.review.findMany({
      where: {
        isActive: true,
      },
      include: {
        item: true,
      },
    });
  }

  async getReviewsByItemId(itemId: number) {
    return this.prisma.review.findMany({
      where: {
        itemId: itemId,
      },
      include: {
        item: true,
      },
    });
  }

  async getReviewsByItemIdOfCurrentUser(userId: number, itemId: number) {
    return this.prisma.review.findFirst({
      where: {
        itemId: itemId,
        userId: userId,
      },
      include: {
        item: true,
      },
    });
  }

  async getReviewsOfCurrentUser(userId: number) {
    return this.prisma.review.findMany({
      where: {
        userId: userId,
      },
      include: {
        item: true,
      },
    });
  }

  async getReviewsByFeedbackId(feedbackId: number) {
    return this.prisma.review.findMany({
      where: {
        feedBackId: feedbackId,
      },
      include: {
        feedback: true,
      },
    });
  }
}
