import { Request, Response } from 'express'
import { UserRepository } from '../../domain/repositories/user.repository'
import { GetUserDto } from '../../domain/dto/user/get-user.dto'
import { GetUser } from '../../domain/use-case/user/get-user'
import { UpdateUserDto } from '../../domain/dto/user/update-user.dto'
import { bcrypt } from '../../config/bcrypt'
import { UpdateUser } from '../../domain/use-case/user/update-user'
import { DeleteUserDto } from '../../domain/dto/user/delete-user.dto'
import { DeleteUser } from '../../domain/use-case/user/delete-user'

export class UserController {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    public get = async (req: Request, res: Response) => {
        const [error, getUserDto] = GetUserDto.get(req.params)

        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeById(getUserDto!.id)

        if (user && user.status) {
            return res.status(200).json(user)
        }

        return res.status(404).json({error: `Usuario con id ${getUserDto!.id} no existe`})
    }

    public update = async (req: Request, res: Response) => {
        const [error, updateUserDtoAux1] = UpdateUserDto.update(req.body)

        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeById(updateUserDtoAux1!.id)

        if (user && user.status) {
            const userProps = {
                id: user.id,
                fullName: updateUserDtoAux1!.fullName,
                age: updateUserDtoAux1!.age,
                email: user.email,
                password: bcrypt.hash(updateUserDtoAux1!.password),
                jwt: user.jwt
            }

            const [errorUpdate, updateUserDtoAux2] = UpdateUserDto.update(userProps)

            if (errorUpdate) {
                return res.status(400).json({error: errorUpdate})
            }

            return new UpdateUser(this.userRepository)
                .execute(updateUserDtoAux2!)
                .then(user => res.status(200).json(user))
                .catch(error => res.status(400).json({error}))
        }

        return res.status(404).json({error: `Usuario con id ${updateUserDtoAux1!.id} no existe`})
    }

    public delete = async (req: Request, res: Response) => {
        const [error, deleteUserDto] = DeleteUserDto.delete(req.body)

        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeById(deleteUserDto!.id)

        if (user && user.status) {
            deleteUserDto!.status = false

            return new DeleteUser(this.userRepository)
                .execute(deleteUserDto!)
                .then(user => res.status(200).json(user))
                .catch(error => res.status(400).json({error}))
        }

        return res.status(404).json({error: `Usuario con id ${deleteUserDto!.id} no existe`})
    }
}