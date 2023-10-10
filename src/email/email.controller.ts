import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { makeResponse } from 'src/common/util';
import { MailerService } from './email.service';

@Controller('email')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('message') message: string,
    @Res() res: Response,
  ): Promise<void> {
    const data = await this.mailerService.sendEmail(to, subject, message);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Email Sent Sucessfully',
    });
  }
}
