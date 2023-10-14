import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SubscriptionBoxRepository } from './subscription-box.repository';
import { SubscriptionBoxCreateDto } from './dto';
import { ItemsOnSubscriptionBoxesRepository } from '../items-on-subscription-boxes/items-on-subscription-boxes.repository';
import { ItemRepository } from '../item/item.repository';
import { mapSubscriptionBoxSubscriptionBoxResponseDtoMapper } from '../common/mapper';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class SubscriptionBoxService {
  private readonly logger: Logger = new Logger(SubscriptionBoxService.name);

  constructor(
    private subscriptionBoxRepository: SubscriptionBoxRepository,
    private itemsOnSubscriptionBoxesRepository: ItemsOnSubscriptionBoxesRepository,
    private itemRepository: ItemRepository,
    private userRepository: UserRepository,
  ) {}

  async createASubscriptionBox(
    userId: number,
    subscriptionBoxCreateDto: SubscriptionBoxCreateDto,
  ) {
    this.logger.log(`createSubscription: execution started by user- ${userId}`);

    const existingItems = await this.itemRepository.findManyItems(
      subscriptionBoxCreateDto.items,
    );
    if (existingItems.length !== subscriptionBoxCreateDto.items.length) {
      throw new NotFoundException('Invalid item ids');
    }

    const customer = await this.userRepository.findUserById(
      subscriptionBoxCreateDto.customerId,
    );
    if (customer == null) {
      throw new NotFoundException('Invalid customer');
    }

    // check is there at least one available item (quantity = 1)
    const hasAvailableItem = existingItems.some((item) => item.quantity >= 1);
    if (!hasAvailableItem) {
      throw new NotFoundException('Items are out of the stock');
    }

    // calculate the total amount
    const totalAmount = existingItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.price,
      0,
    );

    const subscriptionBox =
      await this.subscriptionBoxRepository.saveSubscriptionBox(
        subscriptionBoxCreateDto.customerId,
        totalAmount,
      );

    await this.itemsOnSubscriptionBoxesRepository.createItemOnSubscriptionBox(
      subscriptionBox.id,
      subscriptionBoxCreateDto.items,
    );

    // reduce the item quantity by one
    await Promise.all(
      existingItems
        .filter((item) => item.quantity >= 1)
        .map(async (item) => {
          await this.itemRepository.updateItemQuantity(
            item.id,
            item.quantity - 1,
          );
        }),
    );

    return this.mapSubscriptionBoxSubscriptionBoxResponseDtoMapper(
      customer,
      existingItems,
      subscriptionBox,
    );
  }

  async getSubscriptionBoxesByAdmin(userId: number) {
    this.logger.log(
      `getSubscriptionBoxesByAdmin: execution started by user- ${userId}`,
    );

    const subscriptionBoxes = await this.subscriptionBoxRepository.getAll();

    return subscriptionBoxes.map((subscriptionBox) => {
      const { user, ItemsOnSubscriptionBoxes, ...subscriptionBoxData } =
        subscriptionBox;
      const items = ItemsOnSubscriptionBoxes.map((itemLink) => {
        return itemLink.item;
      });
      return this.mapSubscriptionBoxSubscriptionBoxResponseDtoMapper(
        user,
        items,
        subscriptionBoxData,
      );
    });
  }

  async getASubscriptionBox(userId: number, subscriptionId: number) {
    this.logger.log(
      `getASubscriptionBox: execution started by user- ${userId}`,
    );

    const subscriptionBox =
      await this.subscriptionBoxRepository.getSubscriptionBoxById(
        subscriptionId,
      );

    if (!subscriptionBox) {
      throw new NotFoundException('Subscription box not found');
    }

    const items = subscriptionBox.ItemsOnSubscriptionBoxes.map((itemLink) => {
      return itemLink.item;
    });

    return this.mapSubscriptionBoxSubscriptionBoxResponseDtoMapper(
      subscriptionBox.user,
      items,
      subscriptionBox,
    );
  }

  async getSubscriptionBoxesByUser(userId: number) {
    this.logger.log(
      `getSubscriptionBoxesByUser: execution started by user- ${userId}`,
    );

    const subscriptionBoxes =
      await this.subscriptionBoxRepository.getAllByCurrentUser(userId);

    return subscriptionBoxes.map((subscriptionBox) => {
      const { user, ItemsOnSubscriptionBoxes, ...subscriptionBoxData } =
        subscriptionBox;

      const items = ItemsOnSubscriptionBoxes.map((itemLink) => {
        return itemLink.item;
      });

      return mapSubscriptionBoxSubscriptionBoxResponseDtoMapper(
        user,
        items,
        subscriptionBoxData,
      );
    });
  }

  async getASubscriptionBoxesByCurrentUser(
    userId: number,
    subscriptionId: number,
  ) {
    this.logger.log(
      `getASubscriptionBoxesByCurrentUser: execution started by user- ${userId}`,
    );

    const subscriptionBox =
      await this.subscriptionBoxRepository.getSubscriptionBoxByCurrentUserId(
        userId,
        subscriptionId,
      );

    if (!subscriptionBox) {
      throw new NotFoundException('Subscription box not found');
    }

    const items = subscriptionBox.ItemsOnSubscriptionBoxes.map((itemLink) => {
      return itemLink.item;
    });

    return this.mapSubscriptionBoxSubscriptionBoxResponseDtoMapper(
      subscriptionBox.user,
      items,
      subscriptionBox,
    );
  }

  private mapSubscriptionBoxSubscriptionBoxResponseDtoMapper(
    user,
    items,
    subscriptionBox,
  ) {
    return mapSubscriptionBoxSubscriptionBoxResponseDtoMapper(
      user,
      items,
      subscriptionBox,
    );
  }
}
