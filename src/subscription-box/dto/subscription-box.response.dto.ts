export class SubscriptionBoxResponseDto {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: [
    {
      id: number;
      itemName: string;
      price: string;
      category: string;
    },
  ];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
