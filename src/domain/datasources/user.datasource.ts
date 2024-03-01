import { DeleteUserDto } from '../dto/user/delete-user.dto'
import { RegisterUserDto } from '../dto/user/register-user.dto'
import { UpdateUserDto } from '../dto/user/update-user.dto'
import { UserEntity } from '../entities/user.entity'

export abstract class UserDatasource {
    abstract create(registerUserDto: RegisterUserDto): Promise<UserEntity>
    abstract findByEmail(email: string): Promise<UserEntity | null>
    abstract findById(id: number): Promise<UserEntity | null>
    abstract updateById(updateUserDto: UpdateUserDto): Promise<UserEntity>
    abstract delete(deleteUserDto: DeleteUserDto): Promise<UserEntity>
}