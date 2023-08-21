import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './item.repository';

@Module({
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
