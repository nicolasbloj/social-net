'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// connection datbase
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/social-net')
    .then(() => {
        console.log("Conexion realizada correctamente...");

        //create server
        app.listen(port, () => {
            console.log("Servidor creado correctamente, corriendo en http://localhost:3800");
        });

    })
    .catch((err) => console.log(err));



