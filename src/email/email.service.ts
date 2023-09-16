import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail', 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
    );
  }

  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    const mailOptions = {
      from: 'spm project',
      to: to,
      subject: subject,
      text: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}