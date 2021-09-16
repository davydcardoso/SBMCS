import * as nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs';

import { api_config } from '@config/api';

export default class SendEmailRecoverPasswordServices {
  public async execute(email: string, token: string): Promise<void> {
    await ejs.renderFile('layout_email.ejs', { token }, async (err, html) => {
      fs.writeFileSync('email.html', html, 'utf8');

      let mailOptions = {
        from: "portalband@band.com.br",
        to: email,
        subject: 'Email de teste',
        html: html
      };

      const transporter = nodemailer.createTransport({
        host: api_config.email.hostname,
        port: api_config.email.port,
        secure: false,
        auth: {
          user: api_config.email.user,
          pass: api_config.email.password
        },
        tls: { rejectUnauthorized: false }
      });

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw new Error(err.message);
        }
      });
    });
  }
}