import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StorageRepository {
  constructor(private prisma: PrismaService) {}
}
