import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PackageCreateDto, PackageEditDto } from './dto';
import { Package, Prisma } from '@prisma/client';

@Injectable()
export class PackageRepository {
  constructor(private prisma: PrismaService) {}

  async savePackage(packageDto: PackageCreateDto): Promise<Package> {
    return this.prisma.package.create({
      data: { ...packageDto },
    });
  }

  async findById(packageId: number): Promise<Package> {
    return this.prisma.package.findFirst({
      where: {
        id: packageId,
        isActive: true,
      },
    });
  }

  async getAllPackages(): Promise<Package[]> {
    return this.prisma.package.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async updatePackage(
    packageId: number,
    updateDto: PackageEditDto,
  ): Promise<Package> {
    return this.prisma.package.update({
      where: {
        id: packageId,
      },
      data: {
        ...updateDto,
      },
    });
  }

  async deletePackage(packageId: number): Promise<Package> {
    return this.prisma.package.update({
      where: {
        id: packageId,
      },
      data: {
        isActive: false,
      } as Prisma.PackageUpdateInput,
    });
  }
}
