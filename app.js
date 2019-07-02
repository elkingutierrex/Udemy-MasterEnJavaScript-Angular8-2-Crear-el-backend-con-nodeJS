'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos rutas

//middelwares (una capa que se ejecuta antes que la accion de un controlador)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS

//rutas
app.get('/test', (req, res)=> {
    res.status(200).send({
        message: "Hola mundo, desde la api nodeJS"
    })
})

app.get('/', (req, res)=> {
    res.status(200).send(
        '<h1>Página de inicio </h1>'
    )
})

//exportar
module.exports = app;





