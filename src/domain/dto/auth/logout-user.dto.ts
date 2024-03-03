export class LogoutUserDto {
    private constructor(
        public email: string,
    ) {}

    public static logout(props: {[key: string]: any}): [string?, LogoutUserDto?] {
        const { email } = props

        if(!email) {
            return ['la propiedad email es requerida', undefined]
        }

        return [undefined, new LogoutUserDto(email)]
    }
}