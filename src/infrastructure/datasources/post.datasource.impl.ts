import { prisma } from '../../data/postgres'
import { PostDatasource } from '../../domain/datasources/post.datasource'
import { DeletePostDto } from '../../domain/dto/post/delete-post.dto'
import { RegisterPostDto } from '../../domain/dto/post/register-post.dto'
import { UpdatePostDto } from '../../domain/dto/post/update-post.dto'
import { PostEntity } from '../../domain/entities/post.entity'

export class PostDatasourceImpl implements PostDatasource {
    async create(registerPostDto: RegisterPostDto): Promise<PostEntity> {
        const post = await prisma.post.create({
            data: registerPostDto!
        })
        
        return PostEntity.fromObject(post)
    }

    async findByUserId(userId: number, userFullName: string): Promise<PostEntity[]> {
        const posts = await prisma.post.findMany({
            where: { userId }
        })

        // return posts.map(post => PostEntity.fromObject({...post, userFullName}))
        return posts.map((post: PostEntity) => PostEntity.fromObject(post))
    }

    async findById(id: number, userFullName: string): Promise<PostEntity | null> {
        const post = await prisma.post.findFirst({
            where: { id: id, status: true }
        })

        if (!post) {
            return null
        }

        // return PostEntity.fromObject({...post, userFullName})
        return PostEntity.fromObject(post)
    }

    async update(updatePostDto: UpdatePostDto): Promise<PostEntity> {
        const updatedPost = await prisma.post.update({
            where: { id: updatePostDto.id },
            data: updatePostDto.values
        })

        return PostEntity.fromObject(updatedPost)
    }

    async delete(deletePostDto: DeletePostDto): Promise<PostEntity> {
        const deletedPost = await prisma.post.update({
            where: { id: deletePostDto.id },
            data: deletePostDto.values
        })

        return PostEntity.fromObject(deletedPost)
    }
}