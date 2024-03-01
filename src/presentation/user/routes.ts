import { Router } from 'express'
import { UserController } from './controller'
import { UserDatasourceImpl } from '../../infrastructure/datasources/user.datasource.impl'
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl'
import { AuthMiddleware } from '../middlewares/auth.middlewares'

export class UserRoutes {
    static get routes(): Router {
        const router = Router()

        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)

        const userController = new UserController(userRepository)
        const authMiddleware = new AuthMiddleware(userRepository)

        router.get('/:id', (req, res, next) => authMiddleware.validateJWT(req, res, next), (req, res) => userController.get(req, res))
        router.put('/', (req, res, next) => authMiddleware.validateJWT(req, res, next), (req, res) => userController.update(req, res))
        router.delete('/', (req, res, next) => authMiddleware.validateJWT(req, res, next), (req, res) => userController.delete(req, res))

        return router
    }
}