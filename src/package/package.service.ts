import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PackageRepository } from './package.repository';
import { PackageCreateDto, PackageDto } from './dto';
import { mapPackageToPackageDto } from '../common/mapper';
import { Package } from '@prisma/client';

@Injectable()
export class PackageService {
  private readonly logger: Logger = new Logger(PackageService.name);

  constructor(private packageRepository: PackageRepository) {}

  private mapPackageToDto(pkg: Package): PackageDto {
    return mapPackageToPackageDto(pkg);
  }

  async createPackage(
    userId: number,
    packageDto: PackageCreateDto,
  ): Promise<PackageDto> {
    this.logger.log(`createPackage: execution started by user- ${userId}`);

    const newPackage: Package = await this.packageRepository.savePackage(
      packageDto,
    );

    if (!newPackage) {
      throw new InternalServerErrorException('Package not created');
    }

    return this.mapPackageToDto(newPackage);
  }

  async getPackageById(userId: number, packageId: number): Promise<PackageDto> {
    this.logger.log(`getPackageById: execution started by user- ${userId}`);

    const thePackage: Package = await this.packageRepository.findById(
      packageId,
    );

    if (!thePackage) {
      throw new NotFoundException('Package not found');
    }

    return this.mapPackageToDto(thePackage);
  }

  async getAllPackages(userId: number): Promise<{ packages: PackageDto[] }> {
    this.logger.log(`getPackageById: execution started by user- ${userId}`);

    const packages: Package[] = await this.packageRepository.getAllPackages();

    if (!packages || packages.length === 0) {
      throw new NotFoundException('Packages not found');
    }

    return {
      packages: packages.map(this.mapPackageToDto),
    };
  }

  async updatePackage(
    userId: number,
    packageId: number,
    updateDto: PackageCreateDto,
  ): Promise<PackageDto> {
    this.logger.log(`updatePackage: execution started by user- ${userId}`);

    await this.getPackageById(userId, packageId);

    const updatedPackage: Package = await this.packageRepository.updatePackage(
      packageId,
      updateDto,
    );

    if (!updatedPackage) {
      throw new InternalServerErrorException('Unable to update the package');
    }

    return this.mapPackageToDto(updatedPackage);
  }

  async deletePackage(userId: number, packageId: number): Promise<PackageDto> {
    this.logger.log(`deletePackage: execution started by user- ${userId}`);

    await this.getPackageById(userId, packageId);

    const deletePackage: Package = await this.packageRepository.deletePackage(
      packageId,
    );

    if (!deletePackage) {
      throw new InternalServerErrorException('Unable to delete the package');
    }

    return this.mapPackageToDto(deletePackage);
  }
}
