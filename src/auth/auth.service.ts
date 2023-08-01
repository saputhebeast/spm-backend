import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Prisma, Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/user.repository';
import { AuthSignDto } from './dto/auth.sign.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userRepository: UserRepository,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.userRepository.createUser({
        email: dto.email,
        hash,
        role: dto.role,
      });

      return this.signToken(user.id, user.email, user.role);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException(
          'Email already exists. Please choose a different email.',
        );
      }
      throw new Error('Something wrong went with the server');
    }
  }

  async signToken(userId: number, email: string, role: Role) {
    const payload = { sub: userId, email, role };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('jwt.expiresIn'),
      secret: this.config.get('jwt.secret'),
    });
    return {
      access_token: token,
    };
  }

  async signin(dto: AuthSignDto) {
    const user = await this.userRepository.findUserByEmail(dto.email);

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatch = await argon.verify(user.hash, dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email, user.role);
  }
}
