export class RegisterUserDto {
    private constructor(
        public fullName: string,
        public age: number,
        public email: string,
        public password: string,
        public jwt: string,
    ) {}

    public static create(props: {[key: string]: any}): [string?, RegisterUserDto?] {
        const { fullName, age, email, password, jwt = '' } = props

        if (!fullName) {
            return ['la propiedad fullName es requerida', undefined]
        }
        if (!age) {
            return ['la propiedad age es requerida', undefined]
        }
        if (!email) {
            return ['la propiedad email es requerida', undefined]
        }
        if (!password) {
            return ['la propiedad password es requerida', undefined]
        }
        
        return [undefined, new RegisterUserDto(fullName, age, email, password, jwt)]
    }
}