import { UserDatasource } from '../../domain/datasources/user.datasource'
import { DeleteUserDto } from '../../domain/dto/user/delete-user.dto'
import { RegisterUserDto } from '../../domain/dto/user/register-user.dto'
import { UpdateUserDto } from '../../domain/dto/user/update-user.dto'
import { UserEntity } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository'

export class UserRepositoryImpl implements UserRepository {
    // Inyeccion de dependencias
    constructor(
        private readonly datasource: UserDatasource,
    ) {}
    delete(updateUserDto: DeleteUserDto): Promise<UserEntity> {
        return this.datasource.delete(updateUserDto)
    }

    updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.datasource.updateById(updateUserDto)
    }

    findByEmail(email: string): Promise<UserEntity | null> {
        return this.datasource.findByEmail(email)
    }

    findById(id: number): Promise<UserEntity | null> {
        return this.datasource.findById(id)
    }

    create(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.create(registerUserDto)
    }
}