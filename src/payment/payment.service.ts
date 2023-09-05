import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { PackageService } from '../package/package.service';
import { PaymentCreateDto, PaymentResponseDto, PaymentUserDto } from './dto';
import { mapPaymentToPaymentUserResponseDto } from '../common/mapper';

@Injectable()
export class PaymentService {
  private readonly logger: Logger = new Logger(PackageService.name);

  constructor(private paymentRepository: PaymentRepository) {}

  async createPayment(
    userId: number,
    paymentCreateDto: PaymentCreateDto,
  ): Promise<PaymentResponseDto> {
    this.logger.log(`createPayment: execution started by user- ${userId}`);

    const payment: PaymentUserDto = await this.paymentRepository.savePayment(
      userId,
      paymentCreateDto,
    );

    if (!payment) {
      throw new InternalServerErrorException('Payment not created');
    }

    return this.mapPaymentToPaymentUserResponseDto(payment);
  }

  async getPaymentById(
    userId: number,
    paymentId: number,
  ): Promise<PaymentResponseDto> {
    this.logger.log(`getPaymentById: execution started by user- ${userId}`);

    const payment: PaymentUserDto =
      await this.paymentRepository.getPaymentById(paymentId);

    if (!payment) {
      throw new InternalServerErrorException('Payment not found');
    }

    return this.mapPaymentToPaymentUserResponseDto(payment);
  }

  async getAllPaymentsByUserId(
    userId: number,
    paymentUserId: number,
  ): Promise<{ payments: PaymentResponseDto[] }> {
    this.logger.log(
      `getAllPaymentsByUserId: execution started by user- ${userId}`,
    );

    const payments: PaymentUserDto[] =
      await this.paymentRepository.getAllPaymentsByUserId(paymentUserId);

    if (!payments || payments.length == 0) {
      throw new NotFoundException('Payments not found the given user');
    }

    return { payments: payments.map(this.mapPaymentToPaymentUserResponseDto) };
  }

  async getAllPayments(
    userId: number,
  ): Promise<{ payments: PaymentResponseDto[] }> {
    this.logger.log(`getAllPayments: execution started by user- ${userId}`);

    const payments: PaymentUserDto[] =
      await this.paymentRepository.getAllPayments();

    if (!payments || payments.length == 0) {
      throw new NotFoundException('Payments not found');
    }

    return { payments: payments.map(this.mapPaymentToPaymentUserResponseDto) };
  }

  private mapPaymentToPaymentUserResponseDto(
    paymentUserDto: PaymentUserDto,
  ): PaymentResponseDto {
    return mapPaymentToPaymentUserResponseDto(paymentUserDto);
  }
}
