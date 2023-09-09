import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionBoxRepository {
  constructor(private prisma: PrismaService) {}

  async saveSubscriptionBox(userId: number, totalAmount: number) {
    return this.prisma.subscriptionBox.create({
      data: {
        userId: userId,
        total: totalAmount,
      },
    });
  }


  async getAll() {
    return this.prisma.subscriptionBox.findMany({
      include: {
        user: true,
        ItemsOnSubscriptionBoxes: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async getSubscriptionBoxById(subscriptionId: number) {
    return this.prisma.subscriptionBox.findFirst({
      where: {
        id: subscriptionId,
      },
      include: {
        user: true,
        ItemsOnSubscriptionBoxes: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async getAllByCurrentUser(userId: number) {
    return this.prisma.subscriptionBox.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        ItemsOnSubscriptionBoxes: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async getSubscriptionBoxByCurrentUserId(
    userId: number,
    subscriptionId: number,
  ) {
    return this.prisma.subscriptionBox.findFirst({
      where: {
        id: subscriptionId,
        userId: userId,
      },
      include: {
        user: true,
        ItemsOnSubscriptionBoxes: {
          include: {
            item: true,
          },
        },
      },
    });
  }
}
