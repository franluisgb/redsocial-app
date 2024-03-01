export class UpdateUserDto {
    private constructor(
        public id: number,
        public fullName: string,
        public age: number,
        public email: string,
        public password: string,
        public jwt: string,
        public status: boolean,
        public updatedAt: Date
    ) {}

    public static update(props: {[key: string]: any}): [string?, UpdateUserDto?] {
        const { id, fullName, age, email, password, jwt = ' ', status = true, updatedAt = new Date() } = props

        if (!id) {
            return ['la propiedad id es requerida', undefined]
        }
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

        return [undefined, new UpdateUserDto(id, fullName, age, email, password, jwt, status, updatedAt)]
    }

    public get values() {
        const returnObj: {[key: string]: any} = {}

        returnObj.status = this.status

        if (this.fullName) {
            returnObj.fullName = this.fullName
        }
        if (this.age) {
            returnObj.age = this.age
        }
        if (this.password) {
            returnObj.password = this.password
        }
        if (this.jwt) {
            returnObj.jwt = this.jwt
        }
        if (this.updatedAt) {
            returnObj.updatedAt = this.updatedAt
        }

        return returnObj
    }
}