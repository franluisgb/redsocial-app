import { NextFunction, Request, Response } from 'express'
import { jsonwebtoken } from '../../config/jwt'
import { UserRepository } from '../../domain/repositories/user.repository'
import { GetUser } from '../../domain/use-case/user/get-user'

export class AuthMiddleware {
    // Inyeccion de dependencias
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    public validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization || req.headers.token

        if (!authorization) {
            return res.status(401).json({error: 'Token invalido' })
        }

        try {
            let token = authorization.toString()
            if (req.headers.authorization) {
                token = token.split(' ')[1]
            }

            const isValidToken = await jsonwebtoken.validateToken(token)

            if (!isValidToken) {
                return res.status(401).json({error: 'Token invalido'})
            }

            const user = await new GetUser(this.userRepository).executeByEmail(isValidToken.email)

            if (user?.jwt !== token) {
                return res.status(401).json({error: `Token invalido para el usuario ${isValidToken.email}`})
            }

            next()
        } catch(error) {
            return res.status(500).json({error: 'Error al validar token'})
        }
    }
}