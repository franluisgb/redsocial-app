import nodemailer from 'nodemailer'
import { envs } from '../../config/envs'

export interface SendMailOptions {
    to: string
    subject: string
    htmlBody: string
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    // Inyeccion de dependencias
    constructor() {}
    
    public async sendEmail(options: SendMailOptions): Promise<boolean> {
        const {to, subject, htmlBody} = options

        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            })
            return true
        } catch (error) {
            return false
        }
    }
}