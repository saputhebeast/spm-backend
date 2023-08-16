import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ErrorMiddleware } from './common/middleware';
import { EnvironmentConfiguration } from './config';
import { validationSchema } from './config/validation';
import { HealthModule } from './health/health.module';
import { StorageModule } from './storage/storage.module';
import { PackageModule } from './package/package.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [EnvironmentConfiguration],
      validationSchema,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    HealthModule,
    StorageModule,
    PackageModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ErrorMiddleware).forRoutes('*');
  }
}
