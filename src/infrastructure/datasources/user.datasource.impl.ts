import { prisma } from '../../data/postgres'
import { UserDatasource } from '../../domain/datasources/user.datasource'
import { DeleteUserDto } from '../../domain/dto/user/delete-user.dto'
import { RegisterUserDto } from '../../domain/dto/user/register-user.dto'
import { UpdateUserDto } from '../../domain/dto/user/update-user.dto'
import { UserEntity } from '../../domain/entities/user.entity'

export class UserDatasourceImpl implements UserDatasource {
    async delete(deleteUserDto: DeleteUserDto): Promise<UserEntity> {
        const deletedUser = await prisma.user.update({
            where: { id: deleteUserDto.id },
            data: deleteUserDto.values
        })

        return UserEntity.fromObject(deletedUser)
    }

    async updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const updatedUser = await prisma.user.update({
            where: { id: updateUserDto.id },
            data: updateUserDto.values
        })

        return UserEntity.fromObject(updatedUser)
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findFirst({
            where: { email }
        })

        if (!user) {
            return null
        }

        return UserEntity.fromObject(user)
    }

    async findById(id: number): Promise<UserEntity | null> {
        const user = await prisma.user.findFirst({
            where: { id }
        })

        if (!user) {
            return null
        }

        return UserEntity.fromObject(user)
    }

    async create(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const user = await prisma.user.create({
            data: registerUserDto!
        })
        
        return UserEntity.fromObject(user)
    }
}