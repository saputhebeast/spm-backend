import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { EditUserDto, UserResponseDto } from './dto';
import { UserRepository } from './user.repository';
import { mapUserToUserResponseDto } from '../common/mapper';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async editUser(userId: number, data: EditUserDto): Promise<UserResponseDto> {
    this.logger.log('editUser: execution started');
    const user: User = await this.userRepository.updateUserById(userId, data);

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return this.mapUserToUserResponseDto(user);
  }

  async getMe(userId: number): Promise<UserResponseDto> {
    this.logger.log('getMe: execution started');

    const user: User = await this.userRepository.findUserById(userId);

    return this.mapUserToUserResponseDto(user);
  }

  private mapUserToUserResponseDto(user: User): UserResponseDto {
    return mapUserToUserResponseDto(user);
  }
}
