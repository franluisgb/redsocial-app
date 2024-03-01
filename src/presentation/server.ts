import express, { Router } from 'express'

export class Server {
    private readonly port: number
    private app = express()
    private readonly routes: Router

    constructor(port: number, routes: Router) {
        this.port = port
        this.routes = routes
    }

    public async start() {
        this.app.use(express.json()); // peticiones con formato raw
        this.app.use(express.urlencoded({ extended: true })); // peticiones con formato x-www-form-urlencoded

        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}