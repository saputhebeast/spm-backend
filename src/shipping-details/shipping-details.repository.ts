import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShippingDetailsCreateDto } from './dto';

@Injectable()
export class ShippingDetailsRepository {
  constructor(private prisma: PrismaService) {}

  async createShippingDetails(
    userId: number,
    shippingDetailsCreateDto: ShippingDetailsCreateDto,
  ) {
    return await this.prisma.shippingDetails.create({
      data: {
        ...shippingDetailsCreateDto,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async getShippingDetails(userId: number) {
    return await this.prisma.shippingDetails.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  }
}
