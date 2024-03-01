import { PostEntity } from '../../entities/post.entity'
import { PostRepository } from '../../repositories/post.repository'

export interface GetPostUseCase {
    executeByUserId(userId: number, userFullName: string): Promise<PostEntity[]>
    executeById(id: number, userFullName: string): Promise<PostEntity | null>
}

export class GetPost implements GetPostUseCase {
    constructor(
        private readonly repository: PostRepository,
    ) {}

    executeByUserId(userId: number, userFullName: string): Promise<PostEntity[]> {
        return this.repository.findByUserId(userId, userFullName)
    }

    executeById(id: number, userFullName: string): Promise<PostEntity | null> {
        return this.repository.findById(id, userFullName)
    }
}