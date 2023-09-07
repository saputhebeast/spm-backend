import { JwtGuard, ManagerSuperAdminGuard, UserGuard } from '../auth/guard';
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
import { GetUser } from '../auth/decorator';
import { makeResponse } from '../common/util';
import { SubscriptionBoxCreateDto } from './dto';
import { SubscriptionBoxService } from './subscription-box.service';

@UseGuards(JwtGuard)
@Controller('subscription-box')
export class SubscriptionBoxController {
  constructor(private subscriptionBoxService: SubscriptionBoxService) {}

  @Post()
  @UseGuards(ManagerSuperAdminGuard)
  async createSubscriptionBox(
    @GetUser('id') userId: number,
    @Body() subscriptionBoxCreateDto: SubscriptionBoxCreateDto,
    @Res() res: Response,
  ) {
    const data = await this.subscriptionBoxService.createASubscriptionBox(
      userId,
      subscriptionBoxCreateDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Subscription box created',
    });
  }

  @Get('admin')
  @UseGuards(ManagerSuperAdminGuard)
  async getAllSubscriptionBoxes(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ) {
    const data = await this.subscriptionBoxService.getSubscriptionBoxesByAdmin(
      userId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Subscription boxes retrieved successfully',
    });
  }

  @Get('admin/:id')
  @UseGuards(ManagerSuperAdminGuard)
  async getASubscriptionBox(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) subscriptionId: number,
    @Res() res: Response,
  ) {
    const data = await this.subscriptionBoxService.getASubscriptionBox(
      userId,
      subscriptionId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Subscription box retrieved successfully',
    });
  }

  @Get('user')
  @UseGuards(UserGuard)
  async getAllSubscriptionBoxesByCurrentUser(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ) {
    const data = await this.subscriptionBoxService.getSubscriptionBoxesByUser(
      userId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Subscription boxes retrieved successfully',
    });
  }

  @Get('user/:id')
  @UseGuards(UserGuard)
  async getASubscriptionBoxesByCurrentUser(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) subscriptionId: number,
    @Res() res: Response,
  ) {
    const data =
      await this.subscriptionBoxService.getASubscriptionBoxesByCurrentUser(
        userId,
        subscriptionId,
      );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Subscription box retrieved successfully',
    });
  }

  // update a subscription box
}
