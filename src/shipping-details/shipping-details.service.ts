import { Injectable, Logger } from '@nestjs/common';
import { ShippingDetailsRepository } from './shipping-details.repository';
import { ShippingDetailsCreateDto } from './dto';
import { mapShippingToShippingDetailsResponseDto } from '../common/mapper';

@Injectable()
export class ShippingDetailsService {
  private readonly logger: Logger = new Logger(ShippingDetailsService.name);

  constructor(private shippingDetailsRepository: ShippingDetailsRepository) {}

  async createShippingDetails(
    userId: number,
    shippingDetailsCreateDto: ShippingDetailsCreateDto,
  ) {
    this.logger.log(
      `createShippingDetails: execution started by user- ${userId}`,
    );

    const shippingDetails =
      await this.shippingDetailsRepository.createShippingDetails(
        userId,
        shippingDetailsCreateDto,
      );

    return this.mapShippingToShippingDetailsResponseDto(shippingDetails);
  }

  private mapShippingToShippingDetailsResponseDto(shippingDetails) {
    return mapShippingToShippingDetailsResponseDto(shippingDetails);
  }

  async getShippingDetails(userId: number) {
    this.logger.log(`getShippingDetails: execution started by user- ${userId}`);

    const shippingDetails =
      await this.shippingDetailsRepository.getShippingDetails(userId);

    return this.mapShippingToShippingDetailsResponseDto(shippingDetails);
  }
}
