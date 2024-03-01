import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { UserRoutes } from './user/routes'
import { PostRoutes } from './post/routes'

export class AppRoutes {
    static get routes(): Router {
        const router = Router()

        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/user', UserRoutes.routes)
        router.use('/api/post', PostRoutes.routes)

        return router
    }
}
