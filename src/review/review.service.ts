import { Injectable, Logger, Scope } from '@nestjs/common';
import { ReviewRepository } from './review.repository';

@Injectable({ scope: Scope.DEFAULT })
export class ReviewService {
  private readonly logger: Logger = new Logger(ReviewService.name);
  constructor(private reviewRepository: ReviewRepository) {}
}
