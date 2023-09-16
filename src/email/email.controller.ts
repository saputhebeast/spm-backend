import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './email.service';

@Controller('email')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('message') message: string,
  ) {
    try {
      await this.mailerService.sendEmail(to, subject, message);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send email' };
    }
  }
}