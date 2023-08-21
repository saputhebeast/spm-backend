import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PackageCreateDto, PackageEditDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PackageRepository {
  constructor(private prisma: PrismaService) {}

  async savePackage(packageDto: PackageCreateDto) {
    return this.prisma.package.create({
      data: { ...packageDto },
    });
  }

  async findById(packageId: number) {
    return this.prisma.package.findFirst({
      where: {
        id: packageId,
        isActive: true,
      },
    });
  }

  async getAllPackages() {
    return this.prisma.package.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async updatePackage(packageId: number, updateDto: PackageEditDto) {
    return this.prisma.package.update({
      where: {
        id: packageId,
      },
      data: {
        ...updateDto,
      },
    });
  }

  async deletePackage(packageId: number) {
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
