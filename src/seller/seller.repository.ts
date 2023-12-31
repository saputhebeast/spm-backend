import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SellerCreateDto, SellerEditDto } from './dto';
import { Seller } from '@prisma/client';

@Injectable()
export class SellerRepository {
  constructor(private prisma: PrismaService) {}

  async saveSeller(sellerDto: SellerCreateDto): Promise<Seller> {
    return this.prisma.seller.create({
      data: { ...sellerDto },
    });
  }

  async findById(sellerId: number): Promise<Seller> {
    return this.prisma.seller.findFirst({
      where: {
        id: sellerId,
        isActive: true,
      },
    });
  }

  async getAllSellers(): Promise<Seller[]> {
    return this.prisma.seller.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async updateSeller(
    sellerId: number,
    sellerUpdateDto: SellerEditDto,
  ): Promise<Seller> {
    return this.prisma.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        ...sellerUpdateDto,
      },
    });
  }

  async deleteSeller(sellerId: number): Promise<Seller> {
    return this.prisma.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        isActive: false,
      },
    });
  }
}
