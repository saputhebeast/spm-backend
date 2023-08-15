import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, ManagerSuperAdminGuard } from '../auth/guard';
import { PackageService } from './package.service';
import { GetUser } from '../auth/decorator';
import { PackageCreateDto } from './dto';

@UseGuards(JwtGuard)
@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Post()
  @UseGuards(ManagerSuperAdminGuard)
  createPackage(
    @GetUser('id') userId: number,
    @Body() packageDto: PackageCreateDto,
  ) {
    return this.packageService.createPackage(userId, packageDto);
  }

  @Get(':id')
  getPackageById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) packageId: number,
  ) {
    return this.packageService.getPackageById(userId, packageId);
  }

  @Get()
  getAllPackages(@GetUser('id') userId: number) {
    return this.packageService.getAllPackages(userId);
  }

  @Patch(':id')
  updatePackage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) packageId: number,
    @Body() updateDto: PackageCreateDto,
  ) {
    return this.packageService.updatePackage(userId, packageId, updateDto);
  }

  @Delete(':id')
  deletePackage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) packageId: number,
  ) {
    return this.packageService.deletePackage(userId, packageId);
  }
}
