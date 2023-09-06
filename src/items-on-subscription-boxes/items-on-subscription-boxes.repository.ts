import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsOnSubscriptionBoxesRepository {
  constructor(private prism: PrismaService) {}

  async createItemOnSubscriptionBox(id: number, items: number[]) {
    await Promise.all(
      items.map(async (item) => {
        await this.prism.itemsOnSubscriptionBoxes.create({
          data: {
            itemId: item,
            subscriptionBoxId: id,
          },
        });
      }),
    );
  }
}
