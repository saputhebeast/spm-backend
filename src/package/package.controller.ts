import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard, ManagerGuard } from '../auth/guard';
import { PackageService } from './package.service';
import { GetUser } from '../auth/decorator';
import { PackageCreateDto } from './dto';

@UseGuards(JwtGuard)
@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Post()
  @UseGuards(ManagerGuard)
  createPackage(
    @GetUser('id') userId: number,
    @Body() packageDto: PackageCreateDto,
  ) {
    return this.packageService.createPackage(userId, packageDto);
  }
}
