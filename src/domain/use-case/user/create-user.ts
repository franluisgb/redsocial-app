import { RegisterUserDto } from '../../dto/user/register-user.dto'
import { UserEntity } from '../../entities/user.entity'
import { UserRepository } from '../../repositories/user.repository'

export interface RegisterUserUseCase {
    execute(dto: RegisterUserDto): Promise<UserEntity>
}

export class RegisterUser implements RegisterUserUseCase {
    // Inyeccion de dependencias
    constructor(
        private readonly repository: UserRepository,
    ) {}

    execute(dto: RegisterUserDto): Promise<UserEntity> {
        return this.repository.create(dto)
    }
}