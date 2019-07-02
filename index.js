'use strict'

var mongoose = require('mongoose');
var app = require ('./app');
var port = 3700;


mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(()=>{
            console.log('Conexión a la base de datos satisfactoria');

            //Creación del servidor
            app.listen(port, ()=> {
                console.log('Servidaor corriendo correctamente en la url localhost:'+ port)
            })
        })
        .catch(err => console.log(err));