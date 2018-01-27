'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var middleware_auth = require('../middlewares/authenticated');

//Cargamos Router para tener acceso a metodos GET,POST,PUT,DELETE
var api = express.Router();

api.get('/home', UserController.home);
//api.post('/about', UserController.about);
api.get('/about', middleware_auth.ensureAuth, UserController.about); // next(): para pasar al siguiente metodo  UserController.about
api.post('/save-user', UserController.save);
api.post('/login', UserController.login);
api.get('/user/:id', middleware_auth.ensureAuth, UserController.getUser);
// parametro opcional, agregamos signo ?  ->  /user/:id?

module.exports = api;