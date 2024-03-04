import { DeleteUserDto } from '../../dto/user/delete-user.dto'
import { UserEntity } from '../../entities/user.entity'
import { UserRepository } from '../../repositories/user.repository'

export interface DeleteUserUseCase {
    execute(dto: DeleteUserDto): Promise<UserEntity | null>
}

export class DeleteUser implements DeleteUserUseCase {
    // Inyeccion de dependencias
    constructor(
        private readonly repository: UserRepository,
    ) {}

    execute(dto: DeleteUserDto): Promise<UserEntity | null> {
        return this.repository.delete(dto)
    }
}