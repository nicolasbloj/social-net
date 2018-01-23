'use strict'

// Manejo de rutas.
var express = require('express');

// Conversion de body de las peticiones en obj js.
var bodyParser = require('body-parser');

// load framework
var app = express();

// load routes
var user_routes = require('./routes/user');

// MIDDLEWARES, con el metodo app.use(..) definimos middlewares
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// cors

// routes
app.use('/api',user_routes);


// export
module.exports = app;