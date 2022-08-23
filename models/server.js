
const express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser");
const { dbContection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //conexion a la base de datos para
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB() {
     await   dbContection();
    }

    middlewares() {
        //CORSS
        this.app.use(cors());
        //parseo y lectura del body
        this.app.use(express.json());
        //directorio Publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }
    

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port)
        })
    }
};

module.exports = Server;