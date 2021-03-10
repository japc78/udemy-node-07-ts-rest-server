import express, {Application}  from 'express';
import userRoutes from '../routes/users'
import cors from 'cors'

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.middlewares();
        this.routes();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura del body
        this.app.use( express.json());

        // Carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port ' + this.port);
        })
    }
}

export default Server;
