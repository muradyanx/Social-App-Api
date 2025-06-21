import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (!apiKey) {
      throw new Error('Missing SENDGRID_API_KEY');
    }
    sgMail.setApiKey(apiKey);
  }

  async sendMailVerification(email: string, token: string) {
    const sender = this.configService.get<string>('SENDGRID_SENDER');
    const domain = this.configService.get<string>('FRONTEND_URL');
    if (!sender) {
      throw new Error('Missing the value of SENDGRID_SENDER');
    }
    const verificationUrl = `${domain}/verify-email?token=${token}`;
    const msg = {
      to: email,
      from: { email: sender },
      subject: 'Test Email',
      text: 'sending mail to chek if it works',
      html: `<strong> <a href="${verificationUrl}">Verification token: ${verificationUrl}</a>\`,</strong>`,
    };
    try {
      await sgMail.send(msg);
    } catch (err) {
      console.error(err);
    }
  }
}
