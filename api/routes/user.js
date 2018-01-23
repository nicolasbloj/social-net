'use strict'

var express = require('express');
var UserController = require('../controllers/user');

//Cargamos Router para tener acceso a metodos GET,POST,PUT,DELETE
var api = express.Router();

api.get('/home', UserController.home);
api.post('/about', UserController.about);

module.exports = api;