export class GetUserDto {
    private constructor(
        public id: number,
    ) {}

    public static get(props: {[key: string]: any}): [string?, GetUserDto?] {
        const { id } = props

        if (!id || isNaN(+id)) {
            return ['la propiedad id es requerida y como numerica', undefined]
        }

        return [undefined, new GetUserDto(+id)]
    }
}