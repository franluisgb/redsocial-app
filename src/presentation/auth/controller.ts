import { Request, Response } from 'express'
import { RegisterUserDto } from '../../domain/dto/user/register-user.dto'
import { bcrypt } from '../../config/bcrypt'
import { UserRepository } from '../../domain/repositories/user.repository'
import { RegisterUser } from '../../domain/use-case/user/create-user'
import { EmailService, SendMailOptions } from '../services/email.service'
import { SendEmail } from '../../domain/use-case/email/send-email'
import { jsonwebtoken } from '../../config/jwt'
import { envs } from '../../config/envs'
import { GetUser } from '../../domain/use-case/user/get-user'
import { LoginUserDto } from '../../domain/dto/auth/login-user.dto'
import { UpdateUser } from '../../domain/use-case/user/update-user'
import { UpdateUserDto } from '../../domain/dto/user/update-user.dto'
import { LogoutUserDto } from '../../domain/dto/auth/logout-user.dto'

export class AuthController {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailService,
    ) {}

    public register = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) {
            return res.status(400).json({error: error})
        }

        const existUser = await new GetUser(this.userRepository).executeByEmail(registerUserDto!.email)

        if (!existUser) {
            registerUserDto!.password = bcrypt.hash(registerUserDto!.password)
            registerUserDto!.jwt = await jsonwebtoken.generateToken({email: registerUserDto!.email})

            const subject = 'Registro en red social'
            const htmlBody = `<h3>Confirmación de registro para ${registerUserDto!.fullName}</h3>
            <p>${envs.PATH_APP}/auth/validate/${registerUserDto!.jwt}</p>`

            const optionsEmail: SendMailOptions = {
                to: registerUserDto!.email,
                subject: subject,
                htmlBody: htmlBody,
            }

            return new RegisterUser(this.userRepository)
                .execute(registerUserDto!)
                .then(user => {
                    new SendEmail(this.emailService)
                        .execute(optionsEmail)
                        .then(email => res.status(201).json(user))
                        .catch(error => res.status(400).json({error}))
                    })
                .catch(error => res.status(400).json({error}))
        } else if (!existUser.status) {
            const token = await jsonwebtoken.generateToken({email: registerUserDto!.email})

            const userProps = {
                id: existUser.id,
                fullName: existUser!.fullName,
                age: existUser!.age,
                email: existUser.email,
                password: bcrypt.hash(registerUserDto!.password),
                jwt: token,
                status: true
            }

            const [errorUpdate, updateUserDto] = UpdateUserDto.update(userProps)

            if (errorUpdate) {
                return res.status(400).json({error: errorUpdate})
            }

            const subject = 'Registro en red social'
            const htmlBody = `<h3>Confirmación de activación para ${registerUserDto!.fullName}</h3>
            <p>${envs.PATH_APP}/auth/validate/${token}</p>`

            const optionsEmail: SendMailOptions = {
                to: registerUserDto!.email,
                subject: subject,
                htmlBody: htmlBody,
            }

            return new UpdateUser(this.userRepository)
                .execute(updateUserDto!)
                .then(user => {
                    new SendEmail(this.emailService)
                        .execute(optionsEmail)
                        .then(email => res.status(201).json(user))
                        .catch(error => res.status(400).json({error}))
                    })
                .catch(error => res.status(400).json({error}))
        }

        return res.status(400).json({error: `Email ${registerUserDto!.email} registrado previamente`})
    }

    public login = async (req: Request, res: Response) => {
        const [errorLogin, loginUserDto] = LoginUserDto.login(req.body)

        if (errorLogin) {
            return res.status(400).json({error: errorLogin})
        }

        const user = await new GetUser(this.userRepository).executeByEmail(loginUserDto!.email)

        if (user && user.status) {
            const isPassword = bcrypt.compare(loginUserDto!.password, user.password)

            if (isPassword) {
                const token = await jsonwebtoken.generateToken({email: user!.email})
                
                const userProps = {
                    id: user.id,
                    fullName: user.fullName,
                    age: user.age,
                    email: user.email,
                    password: user.password,
                    jwt: token,
                }

                const [errorUpdate, updateUserDto] = UpdateUserDto.update(userProps)

                if (errorUpdate) {
                    return res.status(400).json({error: errorUpdate})
                }

                return new UpdateUser(this.userRepository)
                    .execute(updateUserDto!)
                    .then(user => res.status(200).json(user))
                    .catch(error => res.status(400).json({error}))
            }
        }

        return res.status(401).json({error: 'Login invalido'})
    }

    public logout = async (req: Request, res: Response) => {
        const [error, logoutUserDto] = LogoutUserDto.logout(req.body)

        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeByEmail(logoutUserDto!.email)

        if (user && user.status) {
            const userProps = {
                id: user.id,
                fullName: user.fullName,
                age: user.age,
                email: user.email,
                password: user.password,
                jwt: ' ',
            }

            const [errorUpdate, updateUserDto] = UpdateUserDto.update(userProps)

            if (errorUpdate) {
                return res.status(400).json({error: errorUpdate})
            }

            return new UpdateUser(this.userRepository)
                .execute(updateUserDto!)
                .then(user => res.status(200).json(user))
                .catch(error => res.status(400).json({error}))
        }

        return res.status(401).json({error: 'Email invalido'})
    }
}