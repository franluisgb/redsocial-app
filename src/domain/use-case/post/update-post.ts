import { UpdatePostDto } from '../../dto/post/update-post.dto'
import { PostEntity } from '../../entities/post.entity'
import { PostRepository } from '../../repositories/post.repository'

export interface UpdatePostUseCase {
    execute(dto: UpdatePostDto): Promise<PostEntity>
}

export class UpdatePost implements UpdatePostUseCase {
    // Inyeccion de dependencias
    constructor(
        private readonly repository: PostRepository,
    ) {}

    execute(dto: UpdatePostDto): Promise<PostEntity> {
        return this.repository.update(dto)
    }
}