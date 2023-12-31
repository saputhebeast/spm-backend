import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { mapItemToItemSellerResponseDto } from '../common/mapper';
import {
  ItemCreateDto,
  ItemEditDto,
  ItemRecommendationDto,
  ItemResponseDto,
  ItemSellerDto,
} from './dto';
import axios, { AxiosResponse } from 'axios';
import { PreferenceRepository } from '../preference/preference.repository';

@Injectable()
export class ItemService {
  private readonly logger: Logger = new Logger(ItemService.name);

  constructor(
    private itemRepository: ItemRepository,
    private preferenceRepository: PreferenceRepository,
  ) {}

  async createItem(
    userId: number,
    itemDto: ItemCreateDto,
  ): Promise<ItemResponseDto> {
    this.logger.log(`createItem: execution started by user- ${userId}`);

    const item: ItemSellerDto = await this.itemRepository.saveItem(itemDto);

    if (!item) {
      throw new InternalServerErrorException('Item not created');
    }

    return this.mapItemToItemSellerResponseDto(item);
  }

  async getItem(userId: number, itemId: number): Promise<ItemResponseDto> {
    this.logger.log(`getItem: execution started by user- ${userId}`);

    const item: ItemSellerDto = await this.itemRepository.getItem(itemId);

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return this.mapItemToItemSellerResponseDto(item);
  }

  async getAllItems(userId: number): Promise<{ items: ItemResponseDto[] }> {
    this.logger.log(`getAllItems: execution started by user- ${userId}`);

    const items: ItemSellerDto[] = await this.itemRepository.getAllItems();

    if (!items || items.length == 0) {
      throw new NotFoundException('Items not found');
    }

    return {
      items: items.map(this.mapItemToItemSellerResponseDto),
    };
  }

  async updateItem(
    userId: number,
    itemId: number,
    updateDto: ItemEditDto,
  ): Promise<ItemResponseDto> {
    this.logger.log(`updateItem: execution started by user- ${userId}`);

    const updateItem: ItemSellerDto = await this.itemRepository.updateItem(
      itemId,
      updateDto,
    );

    if (!updateItem) {
      throw new InternalServerErrorException('Unable to update the item');
    }

    return this.mapItemToItemSellerResponseDto(updateItem);
  }

  async deleteItem(userId: number, itemId: number): Promise<ItemResponseDto> {
    this.logger.log(`deleteItem: execution started by user- ${userId}`);

    await this.getItem(userId, itemId);

    const deletedItem: ItemSellerDto =
      await this.itemRepository.deleteItem(itemId);

    if (!deletedItem) {
      throw new InternalServerErrorException('Unable to delete the item');
    }

    return this.mapItemToItemSellerResponseDto(deletedItem);
  }

  async getAllAvailableItems(
    userId: number,
    customerId: number,
  ): Promise<ItemRecommendationDto[]> {
    try {
      this.logger.log(
        `getAllAvailableItems: execution started by user- ${userId}`,
      );

      const dbItems: { items: ItemResponseDto[] } =
        await this.getAllItems(userId);

      const preferences =
        await this.preferenceRepository.getPreferenceByUserId(customerId);

      let itemRequestDto: {
        Brand: string;
        Type: string;
        Gender?: string;
        Color: string;
        Material: string;
        Size?: string;
      };
      if (preferences === null) {
        itemRequestDto = {
          Brand: 'Adidas',
          Type: 'Running',
          Gender: 'Men',
          Color: 'White',
          Material: 'Mesh',
        };
      } else {
        // Split the preference strings into arrays
        const brands = preferences.brand.split(',');
        const types = preferences.type.split(',');
        const gender = 'Men,Female'.split(',');
        const colors = preferences.color.split(',');
        const materials = preferences.material.split(',');

        // Create a random selection function
        function getRandomValue(arr) {
          const randomIndex = Math.floor(Math.random() * arr.length);
          return arr[randomIndex];
        }

        // Build the itemRequestDto using random values
        itemRequestDto = {
          Brand: capitalizeFirstLetter(getRandomValue(brands)),
          Type: capitalizeFirstLetter(getRandomValue(types)),
          Gender: capitalizeFirstLetter(getRandomValue(gender)),
          Color: capitalizeFirstLetter(getRandomValue(colors)),
          Material: capitalizeFirstLetter(getRandomValue(materials)),
        };

        // Function to capitalize the first letter of a string
        function capitalizeFirstLetter(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
      }

      const recItems: AxiosResponse<any> = await axios.get(
        'https://spm-recommendation-api-ebb89176d9c0.herokuapp.com/recommend',
        { data: itemRequestDto },
      );
      const itemsWithRecommendation: ItemRecommendationDto[] = [];

      for (const item of dbItems.items) {
        const isRecommended = recItems.data.recommendations.some(
          (recItem) => recItem.Brand.toLowerCase() === item.brand.toLowerCase(),
        );
        const itemWithRecommendation: ItemRecommendationDto = {
          ...item,
          isRecommend: isRecommended,
        };
        itemsWithRecommendation.push(itemWithRecommendation);
      }

      return itemsWithRecommendation;
    } catch (error) {
      console.error('Error making GET request:', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  private mapItemToItemSellerResponseDto(item: ItemSellerDto): ItemResponseDto {
    return mapItemToItemSellerResponseDto(item);
  }
}
