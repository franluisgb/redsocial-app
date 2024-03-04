import { PostDatasource } from '../../domain/datasources/post.datasource'
import { DeletePostDto } from '../../domain/dto/post/delete-post.dto'
import { RegisterPostDto } from '../../domain/dto/post/register-post.dto'
import { UpdatePostDto } from '../../domain/dto/post/update-post.dto'
import { PostEntity } from '../../domain/entities/post.entity'
import { PostRepository } from '../../domain/repositories/post.repository'

export class PostRepositoryImpl implements PostRepository {
    // Inyeccion de dependencias
    constructor(
        private readonly datasource: PostDatasource,
    ) {}
    create(registerPostDto: RegisterPostDto): Promise<PostEntity> {
        return this.datasource.create(registerPostDto)
    }

    findByUserId(userId: number, userFullName: string): Promise<PostEntity[]> {
        return this.datasource.findByUserId(userId, userFullName)
    }

    findById(id: number, userFullName: string): Promise<PostEntity | null> {
        return this.datasource.findById(id, userFullName)
    }

    update(updatePostDto: UpdatePostDto): Promise<PostEntity> {
        return this.datasource.update(updatePostDto)
    }

    delete(updatePostDto: DeletePostDto): Promise<PostEntity> {
        return this.datasource.delete(updatePostDto)
    }
}