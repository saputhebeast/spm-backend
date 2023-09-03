export class SubscriptionResponseDto {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  payment: {
    id: number;
    amount: number;
    status: string;
  };
  package: {
    id: number;
    name: string;
    period: number;
    price: number;
  };
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
