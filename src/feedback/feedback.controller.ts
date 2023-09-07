import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, UserGuard } from 'src/auth/guard';
import { FeedbackService } from 'src/feedback/feedback.service';
import { FeedbackDto, FeedbackResponseDto } from 'src/feedback/dto';
import { makeResponse } from '../common/util';

@UseGuards(JwtGuard)
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post(':boxId')
  @UseGuards(UserGuard)
  async createFeedbackBySubscriptionBoxId(
    @Param('boxId', ParseIntPipe) subscriptionBoxId: number,
    @Body() feedbackDto: FeedbackDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: FeedbackResponseDto =
      await this.feedbackService.createFeedbackBySubscriptionBoxId(
        subscriptionBoxId,
        feedbackDto,
      );

    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Feedback Record Created Successfully.',
    });
  }
}
