import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, AuthSignDto, TokenDto } from './dto';
import * as argon from 'argon2';
import { Prisma, Role, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/user.repository';
import { mapTokenToTokenDto } from '../common/mapper';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userRepository: UserRepository,
  ) {}

  async signup(dto: AuthDto): Promise<TokenDto> {
    return argon
      .hash(dto.password)
      .then((hash: string) => {
        return this.userRepository.createUser({
          email: dto.email,
          hash,
          role: dto.role,
        });
      })
      .then((user) => {
        return this.signToken(user.id, user.email, user.role);
      })
      .catch((error) => {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          throw new ForbiddenException('Email already exists in the system.');
        }
        throw new Error('Something went wrong with the server');
      });
  }

  async signToken(
    userId: number,
    email: string,
    role: Role,
  ): Promise<TokenDto> {
    const payload = { sub: userId, email, role };
    const token: string = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('jwt.expiresIn'),
      secret: this.config.get('jwt.secret'),
    });

    return this.mapTokenToTokenDto(token);
  }

  async signin(dto: AuthSignDto): Promise<TokenDto> {
    const user: User = await this.userRepository.findUserByEmail(dto.email);

    if (!user) {
      throw new ForbiddenException('Invalid login credentials');
    }

    const passwordMatch: boolean = await argon.verify(user.hash, dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Invalid login credentials');
    }

    return this.signToken(user.id, user.email, user.role);
  }

  private mapTokenToTokenDto(token: string): TokenDto {
    return mapTokenToTokenDto(token);
  }
}
