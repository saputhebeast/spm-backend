import { Module } from '@nestjs/common';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';

@Module({
  controllers: [PreferenceController],
  providers: [PreferenceService],
})
export class PreferenceModule {}
