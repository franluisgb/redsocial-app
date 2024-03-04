import { UpdateUserDto } from '../../dto/user/update-user.dto'
import { UserEntity } from '../../entities/user.entity'
import { UserRepository } from '../../repositories/user.repository'

export interface UpdateUserUseCase {
    execute(dto: UpdateUserDto): Promise<UserEntity>
}

export class UpdateUser implements UpdateUserUseCase {
    // Inyeccion de dependencias
    constructor(
        private readonly repository: UserRepository,
    ) {}

    execute(dto: UpdateUserDto): Promise<UserEntity> {
        return this.repository.updateById(dto)
    }
}