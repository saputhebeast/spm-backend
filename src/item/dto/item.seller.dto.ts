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
  brand: string;
  outdoor: string;
  gender: string;
  age: number;
  size: string;
  material: string;
  tags: string;
  color: string;
  demandweek: Date;
  demand: number;
  demandCounter: number;
  imageUrl: string;
  rating: number;
}
