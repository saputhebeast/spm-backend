import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import {
  SubscriptionCreateDto,
  SubscriptionDto,
  SubscriptionResponseDto,
} from './dto';
import { mapSubscriptionToSubscriptionResponseDto } from '../common/mapper';
import { ManagerSuperAdminGuard, UserGuard } from '../auth/guard';
import { SubscriptionStatusUpdateDto } from "./dto";

@Injectable()
export class SubscriptionService {
  private readonly logger: Logger = new Logger(SubscriptionService.name);

  constructor(private subscriptionRepository: SubscriptionRepository) {}

  @UseGuards(UseGuards)
  async createSubscription(
    userId: number,
    subscriptionCreateDto: SubscriptionCreateDto,
  ): Promise<SubscriptionResponseDto> {
    this.logger.log(`createSubscription: execution started by user- ${userId}`);

    // TODO: check is package active or not
    // TODO: check is price success or not

    const subscription: SubscriptionDto =
      await this.subscriptionRepository.saveSubscription(
        subscriptionCreateDto,
        userId,
      );

    if (!subscription) {
      throw new InternalServerErrorException('Subscription not created');
    }

    return this.mapSubscriptionToSubscriptionResponseDto(subscription);
  }

  @UseGuards(ManagerSuperAdminGuard)
  async getSubscriptionById(
    userId: number,
    subscriptionId: number,
  ): Promise<SubscriptionResponseDto> {
    this.logger.log(
      `getSubscriptionById: execution started by user- ${userId}`,
    );

    const subscription: SubscriptionDto =
      await this.subscriptionRepository.getSubscriptionById(subscriptionId);

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return this.mapSubscriptionToSubscriptionResponseDto(subscription);
  }

  @UseGuards(ManagerSuperAdminGuard)
  async getAllSubscriptions(
    userId: number,
  ): Promise<{ subscriptions: SubscriptionResponseDto[] }> {
    this.logger.log(
      `getAllSubscriptions: execution started by user- ${userId}`,
    );

    const subscriptions: SubscriptionDto[] =
      await this.subscriptionRepository.getAllSubscriptions();

    if (!subscriptions || subscriptions.length == 0) {
      throw new NotFoundException('Subscription not found');
    }

    return {
      subscriptions: subscriptions.map(
        this.mapSubscriptionToSubscriptionResponseDto,
      ),
    };
  }

  @UseGuards(UserGuard)
  async getCurrentUserSubscriptionById(
    userId: number,
    subscriptionId: number,
  ): Promise<SubscriptionResponseDto> {
    this.logger.log(
      `getCurrentUserSubscriptionById: execution started by user- ${userId}`,
    );

    const subscription: SubscriptionDto =
      await this.subscriptionRepository.getCurrentUserSubscriptionById(
        userId,
        subscriptionId,
      );

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return this.mapSubscriptionToSubscriptionResponseDto(subscription);
  }

  async getAllSubscriptionsByCurrentUser(
    userId: number,
  ): Promise<{ subscriptions: SubscriptionResponseDto[] }> {
    this.logger.log(
      `getAllSubscriptionsByCurrentUser: execution started by user- ${userId}`,
    );

    const subscriptions: SubscriptionDto[] =
      await this.subscriptionRepository.getAllSubscriptionsByCurrentUser(
        userId,
      );

    if (!subscriptions || subscriptions.length == 0) {
      throw new NotFoundException('Subscription not found');
    }

    return {
      subscriptions: subscriptions.map(
        this.mapSubscriptionToSubscriptionResponseDto,
      ),
    };
  }

  async updateSubscription(
    userId: number,
    subscriptionId: number,
    updateDto: SubscriptionStatusUpdateDto,
  ): Promise<SubscriptionResponseDto> {
    this.logger.log(`updateItem: execution started by user- ${userId}`);

    const subscription: SubscriptionDto =
      await this.subscriptionRepository.getCurrentUserSubscriptionById(
        userId,
        subscriptionId,
      );

    if (!subscription) {
      throw new InternalServerErrorException('Check the subscription id again');
    }

    const updatedSubscription: SubscriptionDto =
      await this.subscriptionRepository.updateSubscription(
        subscriptionId,
        updateDto,
      );

    if (!updatedSubscription) {
      throw new InternalServerErrorException(
        'Unable to update the subscription',
      );
    }

    return this.mapSubscriptionToSubscriptionResponseDto(updatedSubscription);
  }

  private mapSubscriptionToSubscriptionResponseDto(
    subscriptionDto: SubscriptionDto,
  ): SubscriptionResponseDto {
    return mapSubscriptionToSubscriptionResponseDto(subscriptionDto);
  }
}
