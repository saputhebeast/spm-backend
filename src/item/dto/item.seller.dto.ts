import { Category, Seller } from '@prisma/client';

export class ItemSellerDto {
  id: number;
  itemName: string;
  price: number;
  category: Category;
  quantity: number;
  sellerId: number;
  seller: Seller;
  isActive: boolean;
}
