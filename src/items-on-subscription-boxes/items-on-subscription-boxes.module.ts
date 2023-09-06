import { Module } from '@nestjs/common';
import { ItemsOnSubscriptionBoxesRepository } from './items-on-subscription-boxes.repository';

@Module({
  providers: [ItemsOnSubscriptionBoxesRepository],
})
export class ItemsOnSubscriptionBoxesModule {}
