export class PostEntity {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public likes: number,
        public userId: number,
        // public userFullName: string,
        public status?: boolean,
        public createdAt?: Date | null,
        public updatedAt?: Date | null,
        public deletedAt?: Date | null,
    ) {}

    public static fromObject(props: {[key: string]: any}): PostEntity {
        const { id, title, content, likes, userId, /*userFullName = '',*/ status, createdAt, updatedAt, deletedAt} = props

        return new PostEntity(id, title, content, likes, userId, /*userFullName,*/ status, createdAt, updatedAt, deletedAt)
    }
}