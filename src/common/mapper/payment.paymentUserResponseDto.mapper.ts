import { PaymentResponseDto, PaymentUserDto } from '../../payment/dto';

export function mapPaymentToPaymentUserResponseDto(
  paymentUserDto: PaymentUserDto,
): PaymentResponseDto {
  return {
    id: paymentUserDto.id,
    user: {
      id: paymentUserDto.user.id,
      firstName: paymentUserDto.user.firstName,
      lastName: paymentUserDto.user.lastName,
      email: paymentUserDto.user.email,
    },
    amount: paymentUserDto.amount,
    status: paymentUserDto.status,
    createdAt: paymentUserDto.createdAt,
    updatedAt: paymentUserDto.updatedAt,
  };
}
