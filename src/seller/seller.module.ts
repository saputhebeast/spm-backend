import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { SellerRepository } from './seller.repository';

@Module({
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
})
export class SellerModule {}
