export class UserEntity {
    constructor(
        public id: number,
        public fullName: string,
        public age: number,
        public email: string,
        public password: string,
        public status?: boolean,
        public jwt?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date,
        // public post?: Post[],
    ) {}

    public static fromObject(props: {[key: string]: any}): UserEntity {
        const { id, fullName, age, email, password, status, jwt, createdAt, updatedAt, deletedAt} = props

        return new UserEntity(id, fullName, age, email, password, status, jwt, createdAt, updatedAt, deletedAt)
    }
}