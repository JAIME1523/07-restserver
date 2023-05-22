
const express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser");
const { dbContection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { socketController } = require('../socket/controller');
class Server {
    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',

            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',



            // categorias: 

        }
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        // this.authPath = '/api/categorias';

        //conexion a la base de datos para
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
        this.sockets();



    }
    async conectarDB() {
        await dbContection();
    }
    middlewares() {
        //CORSS
        this.app.use(cors());
        //parseo y lectura del body
        this.app.use(express.json());
        //directorio Publico
        this.app.use(express.static('public'))
        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            //siempre crear un carpeta si no existe
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }
    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port)
        })
    }
};

module.exports = Server;