import { ShippingDetails } from '@prisma/client';

export function mapShippingToShippingDetailsResponseDto(
  shipping: ShippingDetails,
) {
  return shipping;
}
