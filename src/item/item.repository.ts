import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemCreateDto, ItemEditDto, ItemSellerDto } from './dto';

@Injectable()
export class ItemRepository {
  constructor(private prisma: PrismaService) {}

  async saveItem(itemDto: ItemCreateDto) {
    return this.prisma.item.create({
      data: {
        ...itemDto,
      },
      include: {
        seller: true,
      },
    });
  }

  async getItem(itemId: number) {
    return this.prisma.item.findFirst({
      where: {
        id: itemId,
        isActive: true,
      },
      include: {
        seller: true,
      },
    });
  }

  async getAllItems() {
    return this.prisma.item.findMany({
      where: {
        isActive: true,
      },
      include: {
        seller: true,
      },
    });
  }

  async updateItem(
    itemId: number,
    updateDto: ItemEditDto,
  ) {
    return this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        ...updateDto,
      },
      include: {
        seller: true,
      },
    });
  }

  async deleteItem(itemId: number) {
    return this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        isActive: false,
      },
      include: {
        seller: true,
      },
    });
  }
}
