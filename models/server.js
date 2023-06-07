const express = require('express')
var cors = require('cors')

const {dbConnection} = require('../database/config')

//Cosas que llamo para mi prueba personal de ejemplo
const {Router} = require('express');
const routerEjemplo = Router();


class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Conectar a base de datos
        this.conectarDB()

        //Middlewares: funcion3s que añaden otras funcionalidades al webserver
        this.middlewares();

        //Rutas de la aplicacion

        this.routes()

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS, protege la pagina de manera un poco superficial, pero es recomendable instalarlo
        this.app.use( cors() );

        //lectura y parseo del body. Basicamente te permite recibir archivos en formato json a traves de, por ejemplo, un post.
        this.app.use(express.json())

        // Directorio publico
        //use: palabra clave para decir que esto es un middleware
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuariosRoutes'))

        //1) PRUEBA PERSONAL DE EJEMPLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
        this.app.use(this.usuariosPath,


            //2) Parte de la que se encarga el router
            routerEjemplo.get('/pdeprueba', 


            //3) Parte que usa el router y de la que se encarga el controlador
            (req, res = response) => {
            res.json({
                ok: true,
                msg: 'get API - El psy Cangoroo'
            })
          } ),

            
            
          routerEjemplo.get('/pdeprueba2', (req, res = response) => {
            res.json({
                ok: true,
                msg: 'get API - El psy Cangoroo 2'
            })
          } )
          //3) fin ---------------------------------

          )
          //2) fin --------------------------------------
          //3) FIN DE LA PRUEBA PERSONAL DE EJEMPLO000000000000000000000000000000000        
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo', this.port)
        })
    }


}


module.exports = Server









