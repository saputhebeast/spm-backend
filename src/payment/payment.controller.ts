import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, SuperAdminGuard, UserGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { PaymentService } from './payment.service';
import { makeResponse } from '../common/util';
import { PaymentCreateDto, PaymentResponseDto } from './dto';

@UseGuards(JwtGuard)
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  @UseGuards(UserGuard)
  async createPayment(
    @GetUser('id') userId: number,
    @Body() paymentCreateDto: PaymentCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: PaymentResponseDto = await this.paymentService.createPayment(
      userId,
      paymentCreateDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Payment created successfully',
    });
  }

  @Get(':id')
  async getPaymentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) paymentId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: PaymentResponseDto = await this.paymentService.getPaymentById(
      userId,
      paymentId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Payment retrieved successfully',
    });
  }

  @Get('/user/:id')
  @UseGuards(SuperAdminGuard)
  async getAllPaymentsByUserId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) paymentUserId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: { payments: PaymentResponseDto[] } =
      await this.paymentService.getAllPaymentsByUserId(userId, paymentUserId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Payments retrieved successfully',
    });
  }

  @Get()
  @UseGuards(SuperAdminGuard)
  async getAllPayments(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: { payments: PaymentResponseDto[] } =
      await this.paymentService.getAllPayments(userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Payments retrieved successfully',
    });
  }

  @Get('/current/user')
  @UseGuards(SuperAdminGuard)
  async getAllPaymentsByCurrentUser(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: { payments: PaymentResponseDto[] } =
      await this.paymentService.getAllPaymentsByUserId(userId, userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Payments retrieved successfully',
    });
  }
}
