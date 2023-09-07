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
}
