import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SellerRepository } from './seller.repository';
import { SellerCreateDto, SellerResponseDto } from './dto';
import { Seller } from '@prisma/client';
import { mapSellerToSellerResponseDto } from '../common/mapper';

@Injectable()
export class SellerService {
  private readonly logger: Logger = new Logger(SellerService.name);

  constructor(private sellerRepository: SellerRepository) {}

  async createSeller(
    userId: number,
    sellerDto: SellerCreateDto,
  ): Promise<SellerResponseDto> {
    this.logger.log(`createSeller: execution started by user- ${userId}`);

    const newSeller: Seller = await this.sellerRepository.saveSeller(sellerDto);

    if (!newSeller) {
      throw new InternalServerErrorException('Seller not created');
    }

    return this.mapSellerToSellerResponseDto(newSeller);
  }

  async getSellerById(
    userId: number,
    sellerId: number,
  ): Promise<SellerResponseDto> {
    this.logger.log(`getSellerById: execution started by user- ${userId}`);

    const seller: Seller = await this.sellerRepository.findById(sellerId);

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    return this.mapSellerToSellerResponseDto(seller);
  }

  async getAllSellers(
    userId: number,
  ): Promise<{ sellers: SellerResponseDto[] }> {
    this.logger.log(`getAllSellers: execution started by user- ${userId}`);

    const sellers: Seller[] = await this.sellerRepository.getAllSellers();

    if (!sellers || sellers.length == 0) {
      throw new NotFoundException('Sellers not found');
    }

    return { sellers: sellers.map(this.mapSellerToSellerResponseDto) };
  }

  async updateSeller(
    userId: number,
    sellerId: number,
    sellerUpdateDto: SellerCreateDto,
  ): Promise<SellerResponseDto> {
    this.logger.log(`updateSeller: execution started by user- ${userId}`);

    await this.getSellerById(userId, sellerId);

    const updatedSeller: Seller = await this.sellerRepository.updateSeller(
      sellerId,
      sellerUpdateDto,
    );

    if (!updatedSeller) {
      throw new InternalServerErrorException('Unable to update the seller');
    }

    return this.mapSellerToSellerResponseDto(updatedSeller);
  }

  async deleteSeller(
    userId: number,
    sellerId: number,
  ): Promise<SellerResponseDto> {
    this.logger.log(`deleteSeller: execution started by user- ${userId}`);

    await this.getSellerById(userId, sellerId);

    const deletedSeller: Seller = await this.sellerRepository.deleteSeller(
      sellerId,
    );

    if (!deletedSeller) {
      throw new InternalServerErrorException('Unable to delete the seller');
    }

    return this.mapSellerToSellerResponseDto(deletedSeller);
  }

  private mapSellerToSellerResponseDto(seller: Seller): SellerResponseDto {
    return mapSellerToSellerResponseDto(seller);
  }
}
