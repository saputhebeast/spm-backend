import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ErrorMiddleware } from './common/middleware';
import { EnvironmentConfiguration } from './config';
import { validationSchema } from './config/validation';

dotenv.config();
const currentEnv = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/env/${currentEnv}.env`,
      load: [EnvironmentConfiguration],
      validationSchema,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ErrorMiddleware).forRoutes('*');
  }
}
