import { User } from '@prisma/client';
import { UserResponseDto } from '../../user/dto';

export function mapUserToUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
}
