import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UserRepository } from '../user/user.repository';
import { ManagerGuard, SuperAdminGuard, UserGuard } from './guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserRepository,
    UserGuard,
    ManagerGuard,
    SuperAdminGuard,
  ],
})
export class AuthModule {}
