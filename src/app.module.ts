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
import { SellerModule } from './seller/seller.module';
import { ItemModule } from './item/item.module';
import { PaymentModule } from './payment/payment.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionBoxModule } from './subscription-box/subscription-box.module';
import { ItemsOnSubscriptionBoxesModule } from './items-on-subscription-boxes/items-on-subscription-boxes.module';
import { ReviewModule } from 'src/review/review.mdoule';
import { FeedbackModule } from './feedback/feedback.module';
import { PreferenceModule } from './preference/preference.module';

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
    SellerModule,
    ItemModule,
    PaymentModule,
    SubscriptionModule,
    SubscriptionBoxModule,
    ItemsOnSubscriptionBoxesModule,
    ReviewModule,
    FeedbackModule,
    PreferenceModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ErrorMiddleware).forRoutes('*');
  }
}
