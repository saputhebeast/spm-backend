import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './item.repository';
import { PreferenceRepository } from '../preference/preference.repository';

@Module({
  controllers: [ItemController],
  providers: [ItemService, ItemRepository, PreferenceRepository],
})
export class ItemModule {}
