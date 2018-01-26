'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso_desarrollar_red_social_angular';

// Ya que solo voy a tener un metodo, lo exporto directamente
exports.createToken = function (user) {
    var payload = {
        sub: user._id, //id de documento
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),// Fecha de creacion del token
        exp: moment().add(30, 'days').unix() // Fecha de expiración, en 30 dias.
    };
    return jwt.encode(payload, secret);
};