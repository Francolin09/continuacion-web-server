const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.authPath = '/api/auth'; 
        this.categoriasPath = '/api/categorias' //5 creamos el path que tendrá categorias

        this.conectarDB();

        this.middlewares();

        this.routes()
    }

    async conectarDB(){

        await dbConnection()
    }

    middlewares(){
        this.app.use( express.static('public'))
        this.app.use(cors())

        //Parseo y lectura del body en la peticion
        this.app.use(express.json()) 
    }

    routes(){

        

        this.app.use('/api/usuarios', require('../routes/rutas')) 
        this.app.use(this.authPath, require('../routes/auth')) 
        this.app.use(this.categoriasPath, require('../routes/categorias'))
                                                              
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor corriendo piiiiuuuuuuum en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server;