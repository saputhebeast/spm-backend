import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FeedbackUpdateDto, FeedbackUserDto } from './dto';

@Injectable()
export class FeedbackRepository {
  constructor(private prisma: PrismaService) {}

  async saveFeedback(dto: FeedbackUserDto) {
    return this.prisma.feedback.create({
      data: {
        description: dto.description,
        isSubmitted: false,
        subscriptionBoxId: dto.subscriptionBoxId,
      },
      include: {
        subscriptionBox: true,
      },
    });
  }

  async updateFeedback(feedbackId: number, dto: FeedbackUpdateDto) {
    return this.prisma.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        result: dto.result,
        outcome: dto.outcome,
        isSubmitted: dto.isSubmitted,
        isSubscriptionCancelled: dto.isSubscriptionCancelled,
      },
    });
  }

  async deleteFeedbackById(feedbackId: number) {
    return this.prisma.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        isActive: false,
      },
    });
  }

  // async deleteFeedbackBySubscriptionBoxId(boxId: number) {
  //   return this.prisma.feedback.delete({
  //     where: {
  //       subscriptionBoxId: boxId,
  //     },
  //   });
  // }

  async deleteFeedbackBySubscriptionBoxId(boxId: number) {
    return this.prisma.feedback.update({
      where: {
        subscriptionBoxId: boxId,
      },
      data: {
        isActive: false,
      },
    });
  }

  async getFeedbackById(feedbackId: number) {
    return this.prisma.feedback.findUnique({
      where: {
        id: feedbackId,
      },
      include: {
        subscriptionBox: true,
        reviews: true,
      },
    });
  }

  async getFeedbackBySubscriptionBoxId(boxId: number) {
    return this.prisma.feedback.findUnique({
      where: {
        subscriptionBoxId: boxId,
      },
      include: {
        subscriptionBox: true,
      },
    });
  }

  async getAllFeedbacks() {
    return this.prisma.feedback.findMany({
      where: {
        isActive: true,
      },
      include: {
        subscriptionBox: true,
      },
    });
  }
}
