'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/social-net').then(() => console.log("Conexion realizada correctamente..."))
    .catch((err) => console.log(err));




