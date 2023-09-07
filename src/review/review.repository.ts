import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewCreateDto } from './dto/review.create.dto';

@Injectable({ scope: Scope.DEFAULT })
export class ReviewRepository {
  constructor(private prisma: PrismaService) {}

  async saveReview(dto: ReviewCreateDto) {
    return this.prisma.review.create({
      data: {
        itemId: dto.itemId,
        feedBackId: dto.feedbackId,
        rating: dto.rating,
        description: dto.description,
      },
      include: {
        feedback: true,
        item: true,
      },
      select: {
        id: true,
        rating: true,
        description: true,
        feedBackId: true,
        item: true,
        createdAt: true,
      },
    });
  }
}
