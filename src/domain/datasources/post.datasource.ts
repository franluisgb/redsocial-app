import { DeletePostDto } from '../dto/post/delete-post.dto'
import { RegisterPostDto } from '../dto/post/register-post.dto'
import { UpdatePostDto } from '../dto/post/update-post.dto'
import { PostEntity } from '../entities/post.entity'

export abstract class PostDatasource {
    abstract create(registerPostDto: RegisterPostDto): Promise<PostEntity>
    abstract findByUserId(userId: number, userFullName: string): Promise<PostEntity[]>
    abstract findById(id: number, userFullName: string): Promise<PostEntity | null>
    abstract update(updatePostDto: UpdatePostDto): Promise<PostEntity>
    abstract delete(deletePostDto: DeletePostDto): Promise<PostEntity>
}