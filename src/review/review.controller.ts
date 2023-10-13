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
import {
  JwtGuard,
  ManagerSuperAdminGuard,
  SuperAdminGuard,
  UserGuard,
} from 'src/auth/guard';
import { ReviewService } from 'src/review/review.service';
import { GetUser } from 'src/auth/decorator';
import { makeResponse } from 'src/common/util';
import { Review } from '@prisma/client';
import { ReviewCreateDto, ReviewUpdateDto } from './dto';

@Controller('review')
@UseGuards(JwtGuard)
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UseGuards(UserGuard)
  async saveReview(
    @GetUser('id') userId: number,
    @Body() reviewCreateDto: ReviewCreateDto,
    @Res() res: Response,
  ) {
    const data: Review = await this.reviewService.saveReview(
      userId,
      reviewCreateDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Review saved successfully',
    });
  }

  @Patch(':id')
  @UseGuards(ManagerSuperAdminGuard)
  async updateReviewByReviewId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
    @Body() updateDto: ReviewUpdateDto,
    @Res() res: Response,
  ) {
    const data: Review = await this.reviewService.updateReview(
      userId,
      reviewId,
      updateDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Review updated successfully',
    });
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuard)
  async deleteReviewByReviewId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
    @Res() res: Response,
  ) {
    const data: Review = await this.reviewService.deleteReview(
      userId,
      reviewId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Review deleted successfully',
    });
  }

  @Get()
  async getAllReviews(@GetUser('id') userId: number, @Res() res: Response) {
    const data: Review[] = await this.reviewService.getAllReviews(userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Reviews retrieved successfully',
    });
  }

  @Get('/my')
  async getReviewsOfCurrentUser(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ) {
    const data: Review[] = await this.reviewService.getReviewsOfCurrentUser(
      userId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Reviews Retrieved successfully',
    });
  }

  @Get('/:reviewId')
  async getReviewByReviewId(
    @GetUser('id') userId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Res() res: Response,
  ) {
    const data: Review = await this.reviewService.getReviewById(
      userId,
      reviewId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Review found successfully',
    });
  }

  @Get('/item/:itemId')
  async getReviewsByItemId(
    @GetUser('id') userId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Res() res: Response,
  ) {
    const data: Review[] = await this.reviewService.getReviewsByItemId(
      userId,
      itemId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Reviews Retrieved successfully',
    });
  }

  @Get('/item/:itemId/my')
  async getReviewsByItemIdOfCurrentUser(
    @GetUser('id') userId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Res() res: Response,
  ) {
    const data: Review =
      await this.reviewService.getReviewsByItemIdOfCurrentUser(userId, itemId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Reviews Retrieved successfully',
    });
  }

  @Get('feedback/:feedbackId')
  async getReviewsByFeedbackId(
    @GetUser('id') userId: number,
    @Param('feedbackId', ParseIntPipe) feedbackId: number,
    @Res() res: Response,
  ) {
    const data: Review[] = await this.reviewService.getReviewsByFeedbackId(
      userId,
      feedbackId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Reviews Retrieved successfully',
    });
  }

  @Post('analyse/:reviewId')
  async analyseReview(
    @GetUser('id') userId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Res() res: Response,
  ) {
    const data = await this.reviewService.analyse(userId, reviewId);

    return makeResponse({
      res,
      status: HttpStatus.OK,
      data: data,
      message: 'Reviews Analysed successfully',
    });
  }
}
