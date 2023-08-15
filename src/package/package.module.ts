import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { PackageRepository } from './package.repository';

@Module({
  controllers: [PackageController],
  providers: [PackageService, PackageRepository],
})
export class PackageModule {}
