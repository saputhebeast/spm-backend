import { ReviewResponseDto } from 'src/review/dto';
import { Review, Item } from '@prisma/client';

export function ReviewToReviewResponseDtoMapper(
  review: Review,
  item: Item,
): ReviewResponseDto {
  const response = new ReviewResponseDto();
  response.id = review.id;
  response.description = review.description;
  response.rating = review.rating;
  response.itemId = review.itemId;
  response.itemName = item.itemName;
  return response;
}
