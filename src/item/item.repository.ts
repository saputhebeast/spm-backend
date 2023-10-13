import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemCreateDto, ItemEditDto, ItemSellerDto } from './dto';

@Injectable()
export class ItemRepository {
  constructor(private prisma: PrismaService) {}

  async saveItem(itemDto: ItemCreateDto): Promise<ItemSellerDto> {
    return this.prisma.item.create({
      data: {
        ...itemDto,
      },
      include: {
        seller: true,
      },
    });
  }

  async getItem(itemId: number): Promise<ItemSellerDto> {
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

  async getItemById(itemId: number) {
    return this.prisma.item.findFirst({
      where: {
        id: itemId,
        isActive: true,
      },
    });
  }

  async getAllItems(): Promise<ItemSellerDto[]> {
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
  ): Promise<ItemSellerDto> {
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

  async deleteItem(itemId: number): Promise<ItemSellerDto> {
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

  async findManyItems(items: number[]) {
    return this.prisma.item.findMany({
      where: {
        id: {
          in: items,
        },
      },
    });
  }

  async updateItemQuantity(id: number, quantity: number) {
    await this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        quantity: quantity,
      },
    });
  }
}
