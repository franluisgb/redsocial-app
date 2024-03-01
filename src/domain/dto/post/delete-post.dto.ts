export class DeletePostDto {
    private constructor(
        public id: number,
        public userId: number,
        public status: boolean,
        public deletedAt: Date
    ) {}

    public static delete(props: {[key: string]: any}): [string?, DeletePostDto?] {
        const { id, userId, status = false, deletedAt = new Date() } = props

        if (!id || isNaN(+id)) {
            return ['la propiedad id es requerida y como numerica', undefined]
        }
        if (!userId || isNaN(+userId)) {
            return ['la propiedad userId es requerida y como numerica', undefined]
        }
        
        return [undefined, new DeletePostDto(+id, userId, status, deletedAt)]
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