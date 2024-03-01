import jwt from 'jsonwebtoken'
import { envs } from './envs'

export const jsonwebtoken = {
    async generateToken(payload: any, duration: string = '2h'): Promise<string> {
        return new Promise((resolve) => {
            jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration }, (error, token) => {
                if (error) {
                    return resolve('')
                }
                resolve(token!)
            })
        })
    },
    validateToken(token: string): Promise<any | null> {
        return new Promise((resolve) => {
            jwt.verify(token, envs.JWT_SEED, (error, decoded) => {
                if (error) {
                    return resolve(null)
                }
                resolve(decoded)
            })
        })
    }
}