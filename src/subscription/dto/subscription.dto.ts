import { Package, Payment, User } from '@prisma/client';

export class SubscriptionDto {
  id: number;
  userId: number;
  paymentId: number;
  packageId: number;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  payment: Payment;
  package: Package;
}
