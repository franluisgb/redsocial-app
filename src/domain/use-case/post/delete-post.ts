import { DeletePostDto } from '../../dto/post/delete-post.dto'
import { PostEntity } from '../../entities/post.entity'
import { PostRepository } from '../../repositories/post.repository'

export interface DeletePostUseCase {
    execute(dto: DeletePostDto): Promise<PostEntity | null>
}

export class DeletePost implements DeletePostUseCase {
    // Inyeccion de dependencias
    constructor(
        private readonly repository: PostRepository,
    ) {}

    execute(dto: DeletePostDto): Promise<PostEntity | null> {
        return this.repository.delete(dto)
    }
}