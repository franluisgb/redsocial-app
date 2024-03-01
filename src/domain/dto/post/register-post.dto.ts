export class RegisterPostDto {
    private constructor(
        public title: string,
        public content: string,
        public likes: number,
        public userId: number,
    ) {}

    public static create(props: {[key: string]: any}): [string?, RegisterPostDto?] {
        const { title, content, likes, userId } = props

        if (!title) {
            return ['la propiedad title es requerida', undefined]
        }
        if (!content) {
            return ['la propiedad content es requerida', undefined]
        }
        if (!likes) {
            return ['la propiedad likes es requerida', undefined]
        }
        if (!userId) {
            return ['la propiedad userId es requerida', undefined]
        }
        
        return [undefined, new RegisterPostDto(title, content, likes, userId)]
    }
}