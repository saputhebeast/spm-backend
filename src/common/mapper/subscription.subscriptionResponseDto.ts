import {
  SubscriptionDto,
  SubscriptionResponseDto,
} from '../../subscription/dto';

export function mapSubscriptionToSubscriptionResponseDto(
  subscriptionDto: SubscriptionDto,
): SubscriptionResponseDto {
  return {
    id: subscriptionDto.id,
    user: {
      id: subscriptionDto.user.id,
      firstName: subscriptionDto.user.firstName,
      lastName: subscriptionDto.user.lastName,
      email: subscriptionDto.user.email,
    },
    payment: {
      id: subscriptionDto.payment.id,
      amount: subscriptionDto.payment.amount,
      status: subscriptionDto.payment.status,
    },
    package: {
      id: subscriptionDto.package.id,
      name: subscriptionDto.package.name,
      period: subscriptionDto.package.period,
      price: subscriptionDto.package.price,
    },
    startDate: subscriptionDto.startDate,
    endDate: subscriptionDto.endDate,
    status: subscriptionDto.status,
    createdAt: subscriptionDto.createdAt,
    updatedAt: subscriptionDto.updatedAt,
  };
}
