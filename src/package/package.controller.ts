import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, ManagerSuperAdminGuard } from '../auth/guard';
import { PackageService } from './package.service';
import { GetUser } from '../auth/decorator';
import { PackageCreateDto, PackageDto, PackageEditDto } from './dto';
import { makeResponse } from '../common/util';

@UseGuards(JwtGuard)
@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Post()
  @UseGuards(ManagerSuperAdminGuard)
  async createPackage(
    @GetUser('id') userId: number,
    @Body() packageDto: PackageCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: PackageDto = await this.packageService.createPackage(
      userId,
      packageDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Package created successfully',
    });
  }

  @Get(':id')
  async getPackageById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) packageId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: PackageDto = await this.packageService.getPackageById(
      userId,
      packageId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Package retrieved successfully',
    });
  }

  @Get()
  async getAllPackages(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: { packages: PackageDto[] } =
      await this.packageService.getAllPackages(userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Packages retrieved successfully',
    });
  }

  @Patch(':id')
  @UseGuards(ManagerSuperAdminGuard)
  async updatePackage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) packageId: number,
    @Body() updateDto: PackageEditDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: PackageDto = await this.packageService.updatePackage(
      userId,
      packageId,
      updateDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Package updated successfully',
    });
  }

  @Delete(':id')
  @UseGuards(ManagerSuperAdminGuard)
  async deletePackage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) packageId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: PackageDto = await this.packageService.deletePackage(
      userId,
      packageId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Package deleted successfully',
    });
  }
}
