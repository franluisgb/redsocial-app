import { Request, Response } from 'express'
import { PostRepository } from '../../domain/repositories/post.repository'
import { RegisterPostDto } from '../../domain/dto/post/register-post.dto'
import { GetUser } from '../../domain/use-case/user/get-user'
import { UserRepository } from '../../domain/repositories/user.repository'
import { RegisterPost } from '../../domain/use-case/post/create-post'
import { GetPostDto } from '../../domain/dto/post/get-post.dto'
import { GetPost } from '../../domain/use-case/post/get-post'
import { UpdatePostDto } from '../../domain/dto/post/update-post.dto'
import { UpdatePost } from '../../domain/use-case/post/update-post'
import { DeletePostDto } from '../../domain/dto/post/delete-post.dto'
import { DeletePost } from '../../domain/use-case/post/delete-post'

export class PostController {
    // Inyeccion de dependencias
    constructor(
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository,
    ) {}

    public create = async (req: Request, res: Response) => {
        const [error, registerPostDto] = RegisterPostDto.create(req.body)
    
        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeById(registerPostDto!.userId)

        if (user && user.status) {
            return new RegisterPost(this.postRepository)
                .execute(registerPostDto!)
                .then(post => res.status(201).json(post))
                .catch(error => res.status(400).json({error}))
        }

        return res.status(404).json({error: `Identificador ${registerPostDto!.userId} de usuario no registrado`})
    }

    public getByUser = async (req: Request, res: Response) => {
        const [error, getPostDto] = GetPostDto.get(req.params)
    
        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeById(getPostDto!.userId)

        if (user && user.status) {
            return new GetPost(this.postRepository)
                .executeByUserId(getPostDto!.userId, user.fullName)
                .then(posts => res.status(200).json(posts))
                .catch(error => res.status(400).json({error}))
        }

        return res.status(404).json({error: `Identificador ${getPostDto!.userId} de usuario no registrado`})
    }

    public get = async (req: Request, res: Response) => {
        const [error, getPostDto] = GetPostDto.get(req.params)
    
        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeById(getPostDto!.userId)

        if (user && user.status) {
            return new GetPost(this.postRepository)
                .executeById(getPostDto!.id, user.fullName)
                .then(post => post ? res.status(200).json(post) : res.status(404).json({error: `No existe post para el identificador ${getPostDto!.id}`}))
                .catch(error => res.status(400).json({error}))
        }

        return res.status(404).json({error: `Identificador ${getPostDto!.userId} de usuario no registrado`})
    }

    public update = async (req: Request, res: Response) => {
        const [error, updatePostDto] = UpdatePostDto.update(req.body)
    
        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeById(updatePostDto!.userId)
        const post = await new GetPost(this.postRepository).executeById(updatePostDto!.id, '')

        if (user && user.status) {
            if (post && post.status) {
                if (post.userId === updatePostDto!.userId) {
                    return new UpdatePost(this.postRepository)
                        .execute(updatePostDto!)
                        .then(post => res.status(200).json(post))
                        .catch(error => res.status(400).json({error}))
                }
    
                return res.status(401).json({error: `Post con id ${updatePostDto!.id} no pertenece al usuario ${updatePostDto!.userId}`})
            }

            return res.status(404).json({error: `Post con id ${updatePostDto!.id} no existe`})
        }

        return res.status(404).json({error: `Usuario con id ${updatePostDto!.id} no existe`})
    }

    public delete = async (req: Request, res: Response) => {
        const [error, deletePostDto] = DeletePostDto.delete(req.body)
    
        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await new GetUser(this.userRepository).executeById(deletePostDto!.userId)
        const post = await new GetPost(this.postRepository).executeById(deletePostDto!.id, '')

        if (user && user.status) {
            if (post && post.status) {
                if (post.userId === deletePostDto!.userId) {
                    return new DeletePost(this.postRepository)
                        .execute(deletePostDto!)
                        .then(post => res.status(200).json(post))
                        .catch(error => res.status(400).json({error}))
                }

                return res.status(401).json({error: `Post con id ${deletePostDto!.id} no pertenece al usuario ${deletePostDto!.userId}`})
            }

            return res.status(404).json({error: `Post con id ${deletePostDto!.id} no existe`})
        }

        return res.status(404).json({error: `Usuario con id ${deletePostDto!.id} no existe`})

    }
}