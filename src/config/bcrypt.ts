import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const bcrypt = {
    hash: (password: string) => {
        const salto = genSaltSync()
        return hashSync(password, salto)
    },
    compare: (password: string, hashed: string) => {
        return compareSync(password, hashed)
    }
}