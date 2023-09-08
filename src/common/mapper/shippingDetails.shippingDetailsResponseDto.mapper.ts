import { mapUserToUserResponseDto } from './user.userResponseDto.mapper';

export function mapShippingToShippingDetailsResponseDto(shippingDetails) {
  return {
    id: shippingDetails.id,
    lane1: shippingDetails.lane1,
    lane2: shippingDetails.lane2,
    city: shippingDetails.city,
    state: shippingDetails.state,
    country: shippingDetails.country,
    postalCode: shippingDetails.postalCode,
    createdAt: shippingDetails.createdAt,
    updatedAt: shippingDetails.updatedAt,
    user: mapUserToUserResponseDto(shippingDetails.user),
  };
}
