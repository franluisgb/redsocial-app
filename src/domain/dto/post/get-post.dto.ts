export class GetPostDto {
    private constructor(
        public userId: number,
        public id: number,
    ) {}

    public static get(props: {[key: string]: any}): [string?, GetPostDto?] {
        const { userId, id = 0 } = props

        if (!userId || isNaN(+userId)) {
            return ['la propiedad userId es requerida y como numerica', undefined]
        }

        if (isNaN(+id)) {
            return ['la propiedad id es requerida y como numerica', undefined]
        }

        return [undefined, new GetPostDto(+userId, +id)]
    }
}