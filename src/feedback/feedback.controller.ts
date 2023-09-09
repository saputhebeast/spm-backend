import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, SuperAdminGuard, UserGuard } from 'src/auth/guard';
import { FeedbackService } from 'src/feedback/feedback.service';
import {
  FeedbackUserDto,
  FeedbackUpdateDto,
  FeedbackResponseDto,
} from 'src/feedback/dto';
import { makeResponse } from '../common/util';
import { GetUser } from '../auth/decorator';
import { Feedback } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(UserGuard)
  async createFeedbackBySubscriptionBoxId(
    @GetUser('id') userId: number,
    @Body() feedbackDto: FeedbackUserDto,
    @Res() res: Response,
  ) {
    const data = await this.feedbackService.createFeedbackBySubscriptionBoxId(
      userId,
      feedbackDto,
    );

    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Feedback Record Created Successfully.',
    });
  }
  @Patch(':id')
  @UseGuards(UserGuard)
  async updateFeedbackByFeedbackId(
    @GetUser('id') userId: number,
    @Param('id') feedbackId: number,
    @Body() dto: FeedbackUpdateDto,
    @Res() res: Response,
  ) {
    const data = await this.feedbackService.updateFeedbackByFeedbackId(
      userId,
      feedbackId,
      dto,
    );

    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Feedback Updated Successfully',
    });
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuard)
  async deleteFeedbackByFeedbackId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) feedbackId: number,
    @Res() res: Response,
  ) {
    const data: Feedback =
      await this.feedbackService.deleteFeedbackByFeedbackId(userId, feedbackId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Feedback deleted successfully',
    });
  }

  @Delete(':boxId')
  @UseGuards(SuperAdminGuard)
  async deleteFeedbackBySubscriptionBoxId(
    @GetUser('id') userId: number,
    @Param('boxId', ParseIntPipe) boxId: number,
    @Res() res: Response,
  ) {
    const data: Feedback =
      await this.feedbackService.deleteFeedbackBySubscriptionBoxId(
        userId,
        boxId,
      );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Feedback deleted successfully',
    });
  }

  @Get()
  @UseGuards(UserGuard)
  async getAllFeedbacks(@GetUser('id') userId: number, @Res() res: Response) {
    const data: Feedback[] = await this.feedbackService.getAllFeedbacks(userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Feedbacks retrieved successfully',
    });
  }

  @Get(':feedbackId')
  @UseGuards(UserGuard)
  async getFeedbackById(
    @GetUser('id') userId: number,
    @Param('feedbackId', ParseIntPipe) feedbackId: number,
    @Res() res: Response,
  ) {
    const data: Feedback = await this.feedbackService.getFeedbackById(
      userId,
      feedbackId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Feedback found successfully',
    });
  }

  @Get(':boxId')
  @UseGuards(UserGuard)
  async getFeedbackBySubscriptionBoxId(
    @GetUser('id') userId: number,
    @Param('boxId', ParseIntPipe) boxId: number,
    @Res() res: Response,
  ) {
    const data: Feedback =
      await this.feedbackService.getFeedbackBySubscriptionBoxId(userId, boxId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Feedback found successfully',
    });
  }

  @Get(':feedbackId')
  @UseGuards(UserGuard)
  async getFeedbackDetailedResponseById(
    @GetUser('id') userId: number,
    @Param('feedbackId', ParseIntPipe) feedbackId: number,
    @Res() res: Response,
  ) {
    const data: FeedbackResponseDto =
      await this.feedbackService.getFeedbackDetailedResponseById(
        userId,
        feedbackId,
      );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Feedback Detailed Response fetched Successfully',
    });
  }
}
