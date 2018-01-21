'use strict'

// Manejo de rutas.
var express = require('express');

// Conversion de body de las peticiones en obj js.
var bodyParser = require('body-parser');

// load framework
var app = express();

// cargar rutas


// middlewares
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// cors


// rutas
app.get('/',(req,res)=>{
    res.status(200).send({
        message: 'Hello'
    });
});

// exportar
module.exports = app;