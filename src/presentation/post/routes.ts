import { Router } from 'express'
import { PostController } from './controller'
import { PostDatasourceImpl } from '../../infrastructure/datasources/post.datasource.impl'
import { PostRepositoryImpl } from '../../infrastructure/repositories/post.repository.impl'
import { UserDatasourceImpl } from '../../infrastructure/datasources/user.datasource.impl'
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl'
import { AuthMiddleware } from '../middlewares/auth.middlewares'

export class PostRoutes {
    static get routes(): Router {
        const router = Router()

        const postDatasource = new PostDatasourceImpl()
        const userDatasource = new UserDatasourceImpl()
        const postRepository = new PostRepositoryImpl(postDatasource)
        const userRepository = new UserRepositoryImpl(userDatasource)

        const postController = new PostController(postRepository, userRepository)
        const authMiddleware = new AuthMiddleware(userRepository)

        router.post('/', (req, res, next) => authMiddleware.validateJWT(req, res, next), (req, res) => postController.create(req, res))
        router.put('/', (req, res, next) => authMiddleware.validateJWT(req, res, next), (req, res) => postController.update(req, res))
        router.get('/:userId', (req, res) => postController.getByUser(req, res))
        router.get('/:userId/:id', (req, res) => postController.get(req, res))
        router.delete('/', (req, res, next) => authMiddleware.validateJWT(req, res, next), (req, res) => postController.delete(req, res))

        return router
    }
}