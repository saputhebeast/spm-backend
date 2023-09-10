import { Seller } from '@prisma/client';
import { SellerResponseDto } from '../../seller/dto';

export function mapSellerToSellerResponseDto(
  seller: Seller,
): SellerResponseDto {
  return {
    id: seller.id,
    name: seller.name,
    email: seller.email,
    line1: seller.line1,
    line2: seller.line2,
    city: seller.city,
    postalCode: seller.postalCode,
    state: seller.state,
    country: seller.country,
    isActive: seller.isActive,
    slat: seller.slat,
    slong: seller.slong,
    createdAt: seller.createAt,
    updatedAt: seller.updatedAt,
  };
}
