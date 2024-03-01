export class LoginUserDto {
    private constructor(
        public email: string,
        public password: string
    ) {}

    public static login(props: {[key: string]: any}): [string?, LoginUserDto?] {
        const { email, password } = props

        if(!email) {
            return ['la propiedad email es requerida', undefined]
        }
        if(!password) {
            return ['la propiedad password es requerida', undefined]
        }
        
        return [undefined, new LoginUserDto(email, password)]
    }
}