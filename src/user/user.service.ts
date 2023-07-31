import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, data: EditUserDto) {
    const user: User = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    delete user.hash;
    return user;
  }
}
