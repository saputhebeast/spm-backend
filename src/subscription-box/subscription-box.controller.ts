import { JwtGuard, ManagerSuperAdminGuard } from '../auth/guard';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
      message: 'Subscription box retrieved successfully',
    });
  }

  // get a subscription box by id

  // get all subscription boxes by current user
  // get a subscription box with id by current user

  // update a subscription box
}
