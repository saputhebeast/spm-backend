import { User } from '@prisma/client';

export class PaymentUserDto {
  id: number;
  userId: number;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
