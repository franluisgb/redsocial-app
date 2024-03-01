import { UserEntity } from '../../entities/user.entity'
import { UserRepository } from '../../repositories/user.repository'

export interface GetUserUseCase {
    executeByEmail(email: string): Promise<UserEntity | null>
    executeById(id: number): Promise<UserEntity | null>
}

export class GetUser implements GetUserUseCase {
    constructor(
        private readonly repository: UserRepository,
    ) {}

    executeByEmail(email: string): Promise<UserEntity | null> {
        return this.repository.findByEmail(email)
    }

    executeById(id: number): Promise<UserEntity | null> {
        return this.repository.findById(id)
    }
}