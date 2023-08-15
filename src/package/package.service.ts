import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PackageRepository } from './package.repository';
import { PackageCreateDto, PackageDto } from './dto';

@Injectable()
export class PackageService {
  private readonly logger = new Logger(PackageService.name);

  constructor(private packageRepository: PackageRepository) {}

  async createPackage(userId: number, packageDto: PackageCreateDto) {
    this.logger.log(`createPackage: execution started by user- ${userId}`);

    const newPackage: PackageDto = await this.packageRepository.savePackage(
      packageDto,
    );

    if (!newPackage) {
      throw new InternalServerErrorException('Package not created');
    }

    return newPackage;
  }
}
