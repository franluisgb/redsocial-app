export class UpdatePostDto {
    private constructor(
        public id: number,
        public title: string,
        public content: string,
        public likes: number,
        public userId: number,
        public updatedAt: Date
    ) {}

    public static update(props: {[key: string]: any}): [string?, UpdatePostDto?] {
        const { id, title, content, likes, userId, updatedAt = new Date() } = props

        if (!id || isNaN(+id)) {
            return ['la propiedad id es requerida y como numerica', undefined]
        }
        if (!userId || isNaN(+userId)) {
            return ['la propiedad userId es requerida y como numerica', undefined]
        }
        if (!title) {
            return ['la propiedad title es requerida', undefined]
        }
        if (!content) {
            return ['la propiedad content es requerida', undefined]
        }
        if (!likes) {
            return ['la propiedad likes es requerida', undefined]
        }

        return [undefined, new UpdatePostDto(id, title, content, likes, userId, updatedAt)]
    }

    public get values() {
        const returnObj: {[key: string]: any} = {}

        if (this.title) {
            returnObj.title = this.title
        }
        if (this.content) {
            returnObj.content = this.content
        }
        if (this.likes) {
            returnObj.likes = this.likes
        }
        if (this.updatedAt) {
            returnObj.updatedAt = this.updatedAt
        }

        return returnObj
    }
}