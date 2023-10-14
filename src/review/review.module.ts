import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { PreferenceRepository } from '../preference/preference.repository';
import { ItemRepository } from '../item/item.repository';

@Module({
  providers: [
    ReviewService,
    ReviewRepository,
    PreferenceRepository,
    ItemRepository,
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
