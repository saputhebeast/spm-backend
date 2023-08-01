import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private prisma: PrismaService,
    private userRepository: UserRepository,
  ) {}

  async editUser(userId: number, data: EditUserDto) {
    this.logger.log('editUser: execution started');
    const user: User = await this.userRepository.updateUserById(userId, data);

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    delete user.hash;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
  }

  async getMe(userId: number) {
    const user = await this.userRepository.findUserById(userId);

    delete user.hash;

    return user;
  }
}
