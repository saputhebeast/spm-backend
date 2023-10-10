import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PreferenceDto } from './dto';

@Injectable({ scope: Scope.DEFAULT })
export class PreferenceRepository {
  constructor(private prisma: PrismaService) {}

  async savePreference(userId: number, dto: PreferenceDto) {
    return this.prisma.preference.create({
      data: { ...dto, userId },
      include: {
        user: true,
      },
    });
  }

  async updatePreference(userId: number, dto: PreferenceDto) {
    return this.prisma.preference.update({
      where: {
        userId: userId,
      },
      data: {
        userId: dto.userId,
        material: dto.material,
        brand: dto.brand,
        type: dto.type,
        color: dto.color,
      },
    });
  }

  async getPreferenceByUserId(userId: number) {
    return this.prisma.preference.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  }

  async getPreferenceById(id: number) {
    return this.prisma.preference.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
  }
}
