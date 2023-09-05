import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, ManagerSuperAdminGuard, UserGuard } from '../auth/guard';
import { SubscriptionService } from './subscription.service';
import { GetUser } from '../auth/decorator';
import {
  SubscriptionCreateDto,
  SubscriptionResponseDto,
  SubscriptionStatusUpdateDto,
} from './dto';
import { makeResponse } from '../common/util';

@UseGuards(JwtGuard)
@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  @UseGuards(UserGuard)
  async createSubscription(
    @GetUser('id') userId: number,
    @Body() subscriptionCreateDto: SubscriptionCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: SubscriptionResponseDto =
      await this.subscriptionService.createSubscription(
        userId,
        subscriptionCreateDto,
      );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Subscription created successfully',
    });
  }

  @Get(':id')
  @UseGuards(ManagerSuperAdminGuard)
  async getSubscriptionById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) subscriptionId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: SubscriptionResponseDto =
      await this.subscriptionService.getSubscriptionById(
        userId,
        subscriptionId,
      );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Subscription retrieved successfully',
    });
  }

  @Get()
  @UseGuards(ManagerSuperAdminGuard)
  async getAllSubscriptions(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: { subscriptions: SubscriptionResponseDto[] } =
      await this.subscriptionService.getAllSubscriptions(userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Subscriptions retrieved successfully',
    });
  }

  @Get('/user/:id')
  @UseGuards(UserGuard)
  async getCurrentUserSubscriptionById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) subscriptionId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: SubscriptionResponseDto =
      await this.subscriptionService.getCurrentUserSubscriptionById(
        userId,
        subscriptionId,
      );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Subscription retrieved successfully',
    });
  }

  @Get('current/user')
  @UseGuards(UserGuard)
  async getAllSubscriptionsByCurrentUser(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: { subscriptions: SubscriptionResponseDto[] } =
      await this.subscriptionService.getAllSubscriptionsByCurrentUser(userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Subscriptions retrieved successfully',
    });
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  async updateSubscriptionStatus(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) subscriptionId: number,
    @Body() updateDto: SubscriptionStatusUpdateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: SubscriptionResponseDto =
      await this.subscriptionService.updateSubscription(
        userId,
        subscriptionId,
        updateDto,
      );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Subscription status updated successfully',
    });
  }
}
