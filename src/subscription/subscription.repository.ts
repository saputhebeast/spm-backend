import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  SubscriptionCreateDto,
  SubscriptionDto,
  SubscriptionStatusUpdateDto,
} from './dto';

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
        isActive: true,
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
      where: {
        isActive: true,
      },
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
        isActive: true,
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
        isActive: true,
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

  async deleteSubscription(subscriptionId: number): Promise<SubscriptionDto> {
    return this.prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        isActive: false,
      },
      include: {
        user: true,
        payment: true,
        package: true,
      },
    });
  }
}
