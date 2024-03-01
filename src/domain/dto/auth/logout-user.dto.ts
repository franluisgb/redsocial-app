export class LogoutUserDto {
    private constructor(
        public email: string,
        public jwt: string,
    ) {}

    public static logout(props: {[key: string]: any}): [string?, LogoutUserDto?] {
        const { email, jwt } = props

        if(!email) {
            return ['la propiedad email es requerida', undefined]
        }
        if(!jwt) {
            return ['la propiedad jwt es requerida', undefined]
        }

        const token = jwt.split(' ')[1]

        return [undefined, new LogoutUserDto(email, token)]
    }
}