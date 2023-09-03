import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentCreateDto, PaymentUserDto } from './dto';

@Injectable()
export class PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async savePayment(
    userId: number,
    paymentCreateDto: PaymentCreateDto,
  ): Promise<PaymentUserDto> {
    return this.prisma.payment.create({
      data: {
        ...paymentCreateDto,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async getPaymentById(paymentId: number): Promise<PaymentUserDto> {
    return this.prisma.payment.findFirst({
      where: {
        id: paymentId,
      },
      include: {
        user: true,
      },
    });
  }

  async getAllPaymentsByUserId(userId: number): Promise<PaymentUserDto[]> {
    console.log(userId);
    return this.prisma.payment.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  }

  async getAllPayments(): Promise<PaymentUserDto[]> {
    return this.prisma.payment.findMany({
      include: {
        user: true,
      },
    });
  }
}
