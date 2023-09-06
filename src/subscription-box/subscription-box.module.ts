import { Module } from '@nestjs/common';
import { SubscriptionBoxController } from './subscription-box.controller';
import { SubscriptionBoxService } from './subscription-box.service';
import { SubscriptionBoxRepository } from './subscription-box.repository';
import { ItemsOnSubscriptionBoxesRepository } from '../items-on-subscription-boxes/items-on-subscription-boxes.repository';
import { ItemRepository } from '../item/item.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [SubscriptionBoxController],
  providers: [
    SubscriptionBoxService,
    SubscriptionBoxRepository,
    ItemsOnSubscriptionBoxesRepository,
    ItemRepository,
    UserRepository,
  ],
})
export class SubscriptionBoxModule {}
