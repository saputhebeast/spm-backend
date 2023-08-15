import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PackageRepository } from './package.repository';
import { PackageCreateDto, PackageDto } from './dto';

@Injectable()
export class PackageService {
  private readonly logger = new Logger(PackageService.name);

  constructor(private packageRepository: PackageRepository) {}

  async createPackage(userId: number, packageDto: PackageCreateDto) {
    this.logger.log(`createPackage: execution started by user- ${userId}`);

    const newPackage = await this.packageRepository.savePackage(packageDto);

    if (!newPackage) {
      throw new InternalServerErrorException('Package not created');
    }

    return newPackage;
  }

  async getPackageById(userId: number, packageId: number) {
    this.logger.log(`getPackageById: execution started by user- ${userId}`);

    const thePackage = await this.packageRepository.findById(packageId);

    if (!thePackage) {
      throw new NotFoundException('Package not found');
    }

    return thePackage;
  }

  async getAllPackages(userId: number) {
    this.logger.log(`getPackageById: execution started by user- ${userId}`);

    const packages = await this.packageRepository.getAllPackages();

    if (!packages || packages.length === 0) {
      throw new NotFoundException('Packages not found');
    }

    return packages;
  }

  async updatePackage(
    userId: number,
    packageId: number,
    updateDto: PackageCreateDto,
  ) {
    this.logger.log(`updatePackage: execution started by user- ${userId}`);

    await this.getPackageById(userId, packageId);

    const updatedPackage = await this.packageRepository.updatePackage(
      packageId,
      updateDto,
    );

    if (!updatedPackage) {
      throw new InternalServerErrorException('Unable to update the package');
    }

    return updatedPackage;
  }

  async deletePackage(userId: number, packageId: number) {
    this.logger.log(`deletePackage: execution started by user- ${userId}`);

    await this.getPackageById(userId, packageId);

    const deletePackage = await this.packageRepository.deletePackage(packageId);

    if (!deletePackage) {
      throw new InternalServerErrorException('Unable to delete the package');
    }

    return deletePackage;
  }
}
