export class FeedbackResponseDto {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  subscriptionBox: {
    id: number;
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
  };
  review: {
    id: number;
    rating: number;
    description: string;
  };
}
