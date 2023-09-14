import { ItemResponseDto, ItemSellerDto } from '../../item/dto';

export function mapItemToItemSellerResponseDto(
  item: ItemSellerDto,
): ItemResponseDto {
  return {
    id: item.id,
    itemName: item.itemName,
    price: item.price,
    category: item.category,
    quantity: item.quantity,
    seller: {
      id: item.seller.id,
      name: item.seller.name,
      email: item.seller.email,
    },
    isActive: item.isActive,
    brand: item.brand,
    outdoor: item.outdoor,
    gender: item.gender,
    age: item.age,
    size: item.size,
    material: item.material,
    tags: item.tags,
    demandweek: item.demandweek,
    demand: item.demand,
    color: item.color,
    rating: item.rating,
  };
}
