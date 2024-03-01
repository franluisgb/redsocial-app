export class DeleteUserDto {
    private constructor(
        public id: number,
        public status: boolean,
        public deletedAt: Date
    ) {}

    public static delete(props: {[key: string]: any}): [string?, DeleteUserDto?] {
        const { id, status = false, deletedAt = new Date() } = props

        if (!id || isNaN(+id)) {
            return ['la propiedad id es requerida y como numerica', undefined]
        }
        
        return [undefined, new DeleteUserDto(+id, status, deletedAt)]
    }

    public get values() {
        const returnObj: {[key: string]: any} = {}

        returnObj.status = this.status

        if (this.deletedAt) {
            returnObj.deletedAt = this.deletedAt
        }

        return returnObj
    }
}