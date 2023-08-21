import { Category } from '@prisma/client';

export class ItemResponseDto {
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
  isActive: boolean;
}
