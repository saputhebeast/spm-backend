import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionCreateDto, SubscriptionDto } from './dto';
import { SubscriptionStatusUpdateDto } from './dto';

@Injectable()
export class SubscriptionRepository {
  constructor(private prisma: PrismaService) {}

  async saveSubscription(
    subscriptionCreateDto: SubscriptionCreateDto,
    userId: number,
  ): Promise<SubscriptionDto> {
    return this.prisma.subscription.create({
      data: {
        ...subscriptionCreateDto,
        userId,
      },
      include: {
        user: true,
        payment: true,
        package: true,
      },
    });
  }

  async getSubscriptionById(subscriptionId: number): Promise<SubscriptionDto> {
    return this.prisma.subscription.findFirst({
      where: {
        id: subscriptionId,
      },
      include: {
        user: true,
        payment: true,
        package: true,
      },
    });
  }

  async getAllSubscriptions(): Promise<SubscriptionDto[]> {
    return this.prisma.subscription.findMany({
      include: {
        user: true,
        payment: true,
        package: true,
      },
    });
  }

  async getCurrentUserSubscriptionById(
    userId: number,
    subscriptionId: number,
  ): Promise<SubscriptionDto> {
    return this.prisma.subscription.findFirst({
      where: {
        id: subscriptionId,
        userId: userId,
      },
      include: {
        user: true,
        payment: true,
        package: true,
      },
    });
  }

  async getAllSubscriptionsByCurrentUser(
    userId: number,
  ): Promise<SubscriptionDto[]> {
    return this.prisma.subscription.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        payment: true,
        package: true,
      },
    });
  }

  async updateSubscription(
    subscriptionId: number,
    updateDto: SubscriptionStatusUpdateDto,
  ): Promise<SubscriptionDto> {
    return this.prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        ...updateDto,
      },
      include: {
        user: true,
        payment: true,
        package: true,
      },
    });
  }
}
