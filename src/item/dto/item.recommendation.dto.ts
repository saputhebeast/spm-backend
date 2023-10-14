import { Category } from '@prisma/client';

export class ItemRecommendationDto {
  id: number;
  itemName: string;
  price: number;
  category: Category;
  quantity: number;
  seller: {
    id: number;
    name: string;
    email: string;
  };
  brand: string;
  outdoor: string;
  gender: string;
  age: number;
  size: string;
  material: string;
  tags: string;
  color: string;
  rating: number;
  imageUrl: string;
  isActive: boolean;
  isRecommend: boolean;
}
