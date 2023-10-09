import { Module } from '@nestjs/common';
import { MailerController } from './email.controller';
import { MailerService } from './email.service';

@Module({
  controllers: [MailerController],
  providers: [MailerService],
})
export class EmailModule {}
