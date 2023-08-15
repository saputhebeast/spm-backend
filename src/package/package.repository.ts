import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PackageCreateDto } from './dto';

@Injectable()
export class PackageRepository {
  constructor(private prisma: PrismaService) {}

  async savePackage(packageDto: PackageCreateDto) {
    return this.prisma.package.create({
      data: { ...packageDto },
    });
  }
}
