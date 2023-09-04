export class PaymentResponseDto {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
