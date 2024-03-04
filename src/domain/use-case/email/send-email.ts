import { EmailService, SendMailOptions } from '../../../presentation/services/email.service'

interface SendEmailLogUseCase {
    execute(options: SendMailOptions): Promise<boolean>
}

export class SendEmail implements SendEmailLogUseCase {
    // Inyeccion de dependencias
    constructor(
        private readonly emailService: EmailService,
    ) {}

    public async execute(options: SendMailOptions): Promise<boolean> { 
        try {
            const send = await this.emailService.sendEmail(options)
            if (!send) {
                throw new Error(`Error enviando correo`)
            }
            return true
        } catch (error) {
            return false
        }
    }
}