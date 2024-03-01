import { RegisterPostDto } from '../../dto/post/register-post.dto'
import { PostEntity } from '../../entities/post.entity'
import { PostRepository } from '../../repositories/post.repository'

export interface RegisterPostUseCase {
    execute(dto: RegisterPostDto): Promise<PostEntity>
}

export class RegisterPost implements RegisterPostUseCase {
    constructor(
        private readonly repository: PostRepository,
    ) {}

    execute(dto: RegisterPostDto): Promise<PostEntity> {
        return this.repository.create(dto)
    }
}