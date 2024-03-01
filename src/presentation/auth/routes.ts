import { Router } from 'express'
import { AuthController } from './controller'
import { UserDatasourceImpl } from '../../infrastructure/datasources/user.datasource.impl'
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl'
import { EmailService } from '../services/email.service'

export class AuthRoutes {
    static get routes(): Router {
        const router = Router()

        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)
        const emailService = new EmailService()
        const authController = new AuthController(userRepository, emailService)

        router.post('/register', (req, res) => authController.register(req, res))
        router.post('/login', (req, res) => authController.login(req, res))
        router.post('/logout', (req, res) => authController.logout(req, res))

        return router
    }
}